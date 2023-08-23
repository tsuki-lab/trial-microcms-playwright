import { chromium } from "playwright";
import dotenv from "dotenv-flow";
dotenv.config();

const MICROCMS_SERVICE_ID = process.env.MICROCMS_SERVICE_ID;

type FieldValue =
  | {
      type: "textbox";
      name: string;
      value: string;
    }
  | {
      type: "image";
      name: string;
      path: string;
    };

type Content = {
  endpoint: string;
  contentId?: string;
  fields: FieldValue[];
};

const content: Content = {
  endpoint: "blog",
  fields: [
    {
      type: "textbox",
      name: "タイトル",
      value: "テスト記事",
    },
    {
      type: "image",
      name: "サムネイル画像",
      path: "sample.png",
    },
  ],
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: "auth.json" });

  console.log(content);

  const ENDPOINT = content.endpoint;
  const page = await context.newPage();
  await page.goto(
    `https://${MICROCMS_SERVICE_ID}.microcms.io/apis/${ENDPOINT}/create`
  );

  for (const field of content.fields) {
    switch (field.type) {
      case "textbox":
        await page.getByRole("textbox", { name: field.name }).type(field.value);
        break;

      case "image":
        await page
          .getByRole("group", { name: field.name })
          .getByRole("button", { name: "ドラッグ&ドロップでも追加できます" })
          .click();
        await page
          .setInputFiles('input[type="file"][multiple]', field.path)
          .then(() => console.log(`File uploaded：${field.path}`));
        await page.waitForTimeout(1000);
        await page.getByRole("button", { name: "この画像を使用する" }).click();
        await page.waitForTimeout(500);
        break;

      default:
        break;
    }
  }

  // 公開
  await page.evaluate(() => (window.confirm = () => true));
  await page.getByRole("button", { name: "公開" }).click();

  await browser.close();
})();
