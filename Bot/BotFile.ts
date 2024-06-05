import { getStream, launch } from "puppeteer-stream";

import fs from "node:fs";

const openMeetingAndClickJoin2 = async (
  meetingUrl: string,
  endTime: number,
) => {
  let browser;
  try {
    browser = await launch({
      headless: false,
      executablePath: "/bin/google-chrome",
      userDataDir: `/.config/google-chrome/default`,
      args: ["--enable-background-blur"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(meetingUrl);
    // await page.setDefaultNavigationTimeout(60000);

    // Wait for the iframe and get its content frame
    await page.waitForSelector("iframe.embedded-electron-webview");
    const iframeElement = await page.$("iframe.embedded-electron-webview");
    const iframe = await iframeElement.contentFrame();

    // Wait for the join button and click it
    const joinButtonSelector = "#prejoin-join-button";
    await iframe.waitForSelector(joinButtonSelector, { visible: true });
    const button = await iframe.$(joinButtonSelector);
    await button.click();
    console.log("Clicked the Join Button.");

    await iframe.waitForSelector("span#call-status", { visible: true });

    //experience-container-84a53aeb-38e1-4c78-9b86-8c5cb5101d33
    // experience-container-0437eca2-0f79-4376-b7e4-807f18d3e6f9
    // Start recording with puppeteer-stream

    const videoStream = await getStream(page, {
      audio: true,
      video: true,
    });

    const date = new Date().toLocaleString("es-CL");
    const writer = videoStream.pipe(
      fs.createWriteStream(`./rec/meeting_recording_${date}.mp4`),
    );

    // Calculate the end time in milliseconds
    const endTimeInMilliseconds = endTime;

    // Wait for the specified end time
    // await new Promise((resolve) => setTimeout(resolve, 30000));

    console.log("Clicked the Leave Button.");

    // Stop recording
    setTimeout(() => {
      videoStream.destroy();
      writer.end();
      console.log("Recording saved.");
      page.close();
    }, endTimeInMilliseconds);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

// Schedule the task
export const scheduleTask = (
  url: string,
  startTime: string,
  timeZone: string,
  endTime: string,
) => {
  const now = new Date();
  const meetingTime = new Date(startTime);
  const endTimeArg = new Date(endTime);
  console.log(endTimeArg);
  console.log(startTime, "start Time ");
  console.log(now, "present time");

  const delay = meetingTime.getTime() - now.getTime();
  const endDelay = endTimeArg.getTime() - now.getTime();

  if (delay <= 0) {
    console.log("Scheduled time is in the past. Please provide a future time.");
    return;
  }

  console.log(
    `Task scheduled to run at ${meetingTime.toLocaleTimeString()} ${timeZone}`,
  );
  setTimeout(() => openMeetingAndClickJoin2(url, endDelay), delay);
};
