import puppeteer, { Browser, Page } from "puppeteer";
import path from "path";
import os from "os";

const openMeetingAndClickJoin = async (url: string) => {
  /**HTML ELEM <button type="button" class="fui-Button r1alrhcs ___18nks7k ffp7eso f1p3nwhy f11589ue f1q5o8ev f1pdflbu f1phragk f15wkkf3 f1s2uweq fr80ssc f1ukrpxl fecsdlb f1rq72xc fnp9lpt f1h0usnq fs4ktlq f16h9ulv fx2bmrt f1d6v5y2 f1rirnrt f1uu00uk fkvaka8 f1ux7til f9a0qzu f1lkg8j3 fkc42ay fq7113v ff1wgvm fiob0tu f1j6scgf f1x4h75k f4xjyn1 fbgcvur f1ks1yx8 f1o6qegi fcnxywj fmxjhhp f9ddjv3 f17t0x8g f194v5ow f1qgg65p fk7jm04 fhgccpy f32wu9k fu5nqqq f13prjl2 f1czftr5 f1nl83rv f12k37oa fr96u23 f106e4jj fnkn226" id="prejoin-join-button" data-tid="prejoin-join-button" aria-labelledby="prejoin-join-button calling-prejoin-camera-state-id calling-prejoin-mic-state-id" aria-label="Join now" data-track-action-outcome="joinMeeting" data-track-action-scenario="joinOnPreJoinScreen" data-track-module-name="joinMeetingButton" data-track-action-gesture="click" data-track-action-scenario-type="preJoin" data-track-context-work-loads="callType" data-track-databag-id="9b05b980-0628-4b1c-b8d2-ea4f84e97482">Join now</button> */
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: "/bin/google-chrome",
      userDataDir: `/.config/google-chrome/default`,
      args: ["--enable-background-blur"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(url, { timeout: 60000, waitUntil: "networkidle0" });

    const joinButtonSelector = "#prejoin-join-button";
    // await page.waitForSelector(joinButtonSelector, { timeout: 30000 });

    // Ensure the button is visible and enabled

    const isButtonVisible = await page.evaluate((selector) => {
      const button = document.querySelector("#prejoin-join-button");
      return button;
    }, joinButtonSelector);

    if (isButtonVisible) {
      await page.screenshot({ path: "before_click.png" });
      await page.evaluate((selector) => {
        document.querySelector(selector).click();
      }, joinButtonSelector);
      console.log("Clicked the join button.");
    } else {
      console.log("Join button is not visible or interactable.");
    }

    // Optionally, you can add more interactions or wait for further elements as needed
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
  setTimeout(() => openMeetingAndClickJoin(url), delay);
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
