import axios from 'axios'
import vrchat from 'vrchat'
import readline from 'readline/promises'
import tough from 'tough-cookie'
import dotenv from 'dotenv';
import { wrapper } from 'axios-cookiejar-support';

dotenv.config();

async function main() {
  const axiosConfiguration = wrapper(axios.create({
    headers: {
      'User-Agent': 'vrc-mcp/1.00 sawadasuiren@gmail.com',
    },
    withCredentials: true,
  }));

  // クッキーを有効化する
  axios.defaults.withCredentials = true;

  const SystemApi = new vrchat.SystemApi(
    undefined,
    undefined,
    axiosConfiguration
  );

  // APIキーを取得してクッキーに保存する
  const config = await SystemApi.getConfig() as unknown as { data: { apiKey: string } };
  const jar = new tough.CookieJar();
  axiosConfiguration.defaults.jar = jar;
  jar.setCookie(
    new tough.Cookie({ key: "apiKey", value: config.data.apiKey }),
    "https://api.vrchat.cloud",
    {},
    function () {}
  );


  const configuration = new vrchat.Configuration({
    username: process.env.VRCHAT_USERNAME,
    password: process.env.VRCHAT_PASSWORD,
    apiKey: config.data.apiKey,
  });

  const AuthenticationApi = new vrchat.AuthenticationApi(
    configuration,
    undefined,
    axiosConfiguration
  );

  const user = await AuthenticationApi.getCurrentUser();

  // 2FAが有効な場合は2FAコードを入力する
  if (!user.data.id) {
    const readInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const code = await readInterface.question('2段階認証アプリから6桁のコードを入力してください: ');
    readInterface.close();
    await AuthenticationApi.verify2FA({ code: code }, { jar: axiosConfiguration.defaults.jar });
  }

  const FriendsApi = new vrchat.FriendsApi(configuration, undefined, axiosConfiguration);
  const friends = await FriendsApi.getFriends(0, undefined, true, { jar: axiosConfiguration.defaults.jar });
  console.log(friends);
}

main();
