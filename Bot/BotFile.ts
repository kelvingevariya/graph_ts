import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { InteractiveBrowserCredential } from "@azure/identity";
import dotenv from "dotenv";
dotenv.config();

const credential = new InteractiveBrowserCredential({
  clientId: process.env.OAUTH_CLIENT_ID,
  tenantId: process.env.TENANT_ID,
});
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ["https://graph.microsoft.com/.default"],
});
const client = Client.initWithMiddleware({ authProvider });

const joinMeeting = async (url: string) => {
  try {
    // Use the Microsoft Graph API to join the meeting
    const response = await client.api(url).post({});
    console.log("Joined the meeting:", response);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

// Schedule the task
export const scheduleTask = (
  url: string,
  startTime: string,
  timeZone: string,
) => {
  const now = new Date();
  const meetingTime = new Date(startTime);
  console.log(startTime, "start Time ");
  console.log(now, "present time");

  const delay = meetingTime.getTime() - now.getTime();
  console.log(delay);

  if (delay <= 0) {
    console.log("Scheduled time is in the past. Please provide a future time.");
    return;
  }

  console.log(
    `Task scheduled to run at ${meetingTime.toLocaleTimeString()} ${timeZone}`,
  );
  setTimeout(() => joinMeeting(url), delay);
};

// export const openTeamsUrl = async () => {
//   let browser;
//   try {
//     browser = await puppeteer.launch({
//       headless: false,
//       executablePath: "/bin/google-chrome",
//       userDataDir: `/.config/google-chrome/default`,
//     });

//     const page = await browser.newPage();

//     await page.setViewport({ width: 1920, height: 1080 });

//     page.on("error", (err) => console.error(`Error from page: ${err}`));

//     await page.goto("https://google.com", {
//       timeout: 60000,
//       waitUntil: "networkidle0",
//     }); // Wait until network is idle (no network requests for 500ms)

//     // Wait for a selector that signifies the page has fully loaded
//     const joinButtonSelector = "#APjFqb"; // Adjust the selector as needed
//     await page.waitForSelector(joinButtonSelector, {
//       timeout: 5000,
//       visible: true,
//     }); // Wait for join button, increase timeout if necessary

//     // Handle popup windows, if any

//     await page.type(joinButtonSelector, "Hello"); // Click join button on the main page

//     console.log(`Join button clicked at ${new Date().toLocaleTimeString()}`);

//     // Keep the browser open
//     await new Promise(() => {});
//   } catch (err) {
//     console.error("Error during meeting setup:", err);
//   }
// };

// openTeamsUrl();
