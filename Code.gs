/**
 * Configuration Constants
 */
const SHEET_NAME = 'Leads';
const SENDER_EMAIL = 'dutibe@annhurst-gsl.com';
const SPREADSHEET_ID_KEY = 'CONTACT_FORM_SHEET_ID';

/**
 * Executes for HTTP GET requests. Handled by generic CORS headers.
 */
function doGet() {
  return createResponse({ status: "success", message: "GET request received. This endpoint is for POST submissions." });
}

/**
 * Handles the preflight OPTIONS request required by modern browsers for CORS.
 * We rely on the Web App deployment settings to send the necessary CORS headers.
 */
function doOptions() {
  // For OPTIONS, we return an empty success response.
  return createResponse({}); 
}

/**
 * Executes for HTTP POST requests (your form submission).
 * Processes data, saves to Sheet, and sends an auto-reply email.
 */
function doPost(e) {
  // ----------------------------------------------------------------------
  // ** FIX FOR MANUAL RUNS IN EDITOR **
  // If 'e' is undefined (because the function was run directly in the editor), 
  // we exit gracefully with a message.
  if (!e || (!e.parameter && !e.postData)) {
      Logger.log("doPost executed without valid event object 'e'. If this was a manual test, this is expected.");
      return createResponse({ 
          status: "warning", 
          message: "Function executed manually without data. Please deploy as a Web App to test fully." 
      });
  }
  // ----------------------------------------------------------------------
    
  try {
    // Attempt to get or create the spreadsheet dynamically.
    const ss = getOrCreateSpreadsheet();

    // 1. Parse Data (READS URL-ENCODED DATA)
    let data;
    // We already confirmed e exists above, now check data type
    if (e.postData && e.postData.type === "application/x-www-form-urlencoded") {
      // Data is in e.parameter when application/x-www-form-urlencoded is used
      data = e.parameter; 
    } else if (e.postData && e.postData.type === "application/json" && e.postData.contents) {
      // Fallback for JSON in case you switch back
      data = JSON.parse(e.postData.contents);
    } else {
      // If e exists but data format is unexpected
      throw new Error("Invalid or missing post data in POST request.");
    }
    
    // Convert newsletter to boolean if it came as string "true" or "false"
    const newsletterValue = (data.newsletter === "true" || data.newsletter === true);

    // 2. Save to Sheets
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
        // If the 'Leads' tab was deleted, recreate it.
        sheet = ss.insertSheet(SHEET_NAME);
    }
    
    // Check for header row and add it if necessary
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Time", "Name", "Email", "Phone", "Message", "Service", "Company", "Newsletter"]);
    }

    // Append data row
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      data.service || '',
      data.company || '',
      newsletterValue ? "Yes" : "No"
    ]);

    // 3. Auto-email
    if (data.email) {
      MailApp.sendEmail({
        to: data.email,
        subject: "Your Message to Ann Hurst GSL Has Been Received",
        htmlBody: `
          <h3>Hi ${data.name || 'Valued Customer'},</h3>
          <p>Thank you for reaching out! We have successfully received your message and we aim to reply within 24 hours.</p>
          <p>You submitted the following details:</p>
          <ul>
            <li>**Name:** ${data.name || 'N/A'}</li>
            <li>**Email:** ${data.email || 'N/A'}</li>
            <li>**Interest:** ${data.service || 'N/A'}</li>
          </ul>
          <p>We look forward to speaking with you soon!</p>
          <br/>
          <p>Sincerely,</p>
          <p>The Ann Hurst GSL Team</p>
        `,
        from: SENDER_EMAIL,
        name: "Ann Hurst GSL Customer Service"
      });
    }

    return createResponse({ status: "success", message: "Data received and email sent." });

  } catch (err) {
    Logger.log("POST Error: " + err.toString());
    // On failure, return the error details to the client console for debugging
    return createResponse({ 
      status: "error", 
      message: "An internal server error occurred.", 
      details: err.toString() 
    });
  }
}

/**
 * Looks up the Spreadsheet ID in Script Properties. If not found,
 * creates a new Spreadsheet and stores its ID.
 * @return {GoogleAppsScript.Spreadsheet.Spreadsheet} The target spreadsheet object.
 */
function getOrCreateSpreadsheet() {
  const properties = PropertiesService.getScriptProperties();
  let ssId = properties.getProperty(SPREADSHEET_ID_KEY);
  let ss = null;

  if (ssId) {
    try {
      // Try to open the existing sheet
      ss = SpreadsheetApp.openById(ssId);
    } catch (e) {
      // If the sheet was deleted, ss remains null
      Logger.log("Stored Spreadsheet ID is invalid. Creating new sheet.");
    }
  }

  if (!ss) {
    // Create new spreadsheet and store its ID
    ss = SpreadsheetApp.create('Contact Form Data - Ann Hurst GSL');
    properties.setProperty(SPREADSHEET_ID_KEY, ss.getId());
    Logger.log("New Spreadsheet created with ID: " + ss.getId());
  }
  
  return ss;
}


/**
 * Core function to format the JSON response.
 * We rely on the Web App deployment to handle CORS headers.
 * * @param {object} contentObject The JSON payload to return to the client.
 * @return {GoogleAppsScript.Content.TextOutput} The response object.
 */
function createResponse(contentObject) {
  const jsonString = JSON.stringify(contentObject);
  
  // Use ContentService to return the JSON string.
  const output = ContentService.createTextOutput(jsonString);
  output.setMimeType(ContentService.MimeType.JSON);
  
  return output;
}