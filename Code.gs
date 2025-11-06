/**
 * Configuration Constants
 */
const SHEET_NAME = 'Leads';
// Use your official Google-registered email for best deliverability
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
    // 1. Get or Create Spreadsheet (This is where the error likely occurred previously)
    const ss = getOrCreateSpreadsheet();
    if (!ss) {
        throw new Error("Failed to get or create Spreadsheet.");
    }
    
    // 2. Parse Data (READS URL-ENCODED DATA)
    let data;
    // CRITICAL: We expect application/x-www-form-urlencoded data, which is parsed into e.parameter
    if (e.parameter) {
      data = e.parameter; 
    } else {
      throw new Error("Invalid or missing form data in POST request.");
    }
    
    // Convert newsletter to boolean string (App Script receives all values as strings from e.parameter)
    const newsletterValue = (data.newsletter === "true" || data.newsletter === true);

    // 3. Save to Sheets
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
    
    Logger.log(`Data saved successfully to sheet ID: ${ss.getId()} for: ${data.name}`);

    // 4. Auto-email
    if (data.email) {
      MailApp.sendEmail({
        to: data.email,
        subject: "Your Message to Ann Hurst GSL Has Been Received",
        htmlBody: `
          <p style="font-size: 14px; color: #333;">Hi ${data.name || 'Valued Customer'},</p>
          <p style="font-size: 14px; color: #333;">Thank you for reaching out! We have successfully received your message and we aim to reply within 24 hours.</p>
          
          <div style="border: 1px solid #eee; padding: 15px; border-radius: 5px; margin-top: 20px; background-color: #f9f9f9;">
            <p style="font-weight: bold; margin-top: 0;">Details Submitted:</p>
            <ul style="list-style-type: none; padding-left: 0; margin-bottom: 0;">
              <li><strong>Name:</strong> ${data.name || 'N/A'}</li>
              <li><strong>Email:</strong> ${data.email || 'N/A'}</li>
              <li><strong>Service Interest:</strong> ${data.service || 'N/A'}</li>
            </ul>
          </div>

          <p style="font-size: 14px; color: #333; margin-top: 20px;">We look forward to speaking with you soon!</p>
          <p style="font-size: 14px; color: #333; margin-top: 5px;">Sincerely,</p>
          <p style="font-size: 16px; font-weight: bold; color: #555;">The Ann Hurst GSL Team</p>
        `,
        // IMPORTANT FIX: Explicitly set the 'from' address and the display name
        from: SENDER_EMAIL,
        name: "Ann Hurst GSL Customer Service"
      });
      Logger.log(`Confirmation email sent from ${SENDER_EMAIL} to: ${data.email}`);
    }

    return createResponse({ status: "success", message: "Data received, saved to sheet, and email sent." });

  } catch (err) {
    Logger.log("POST Error: " + err.toString());
    // On failure, return the error details to the client console for debugging
    return createResponse({ 
      status: "error", 
      message: "An internal server error occurred. Check script logs.", 
      details: err.toString() 
    });
  }
}

/**
 * Looks up the Spreadsheet ID in Script Properties. If not found,
 * creates a new Spreadsheet and stores its ID.
 * @return {GoogleAppsScript.Spreadsheet.Spreadsheet} The target spreadsheet object, or null on failure.
 */
function getOrCreateSpreadsheet() {
  const properties = PropertiesService.getScriptProperties();
  let ssId = properties.getProperty(SPREADSHEET_ID_KEY);
  let ss = null;

  if (ssId) {
    try {
      // Try to open the existing sheet
      ss = SpreadsheetApp.openById(ssId);
      Logger.log("Successfully opened existing Spreadsheet: " + ssId);
    } catch (e) {
      // If the sheet was deleted or access was revoked
      Logger.log("ERROR: Stored Spreadsheet ID is invalid or access denied. " + e.toString());
      ss = null; // Ensure ss is null before creating a new one
    }
  }

  if (!ss) {
    // Create new spreadsheet and store its ID
    try {
        ss = SpreadsheetApp.create('Contact Form Data - Ann Hurst GSL');
        properties.setProperty(SPREADSHEET_ID_KEY, ss.getId());
        Logger.log("SUCCESS: New Spreadsheet created with ID: " + ss.getId());
    } catch (createError) {
        Logger.log("CRITICAL ERROR: Failed to create new Spreadsheet. Check user permissions. " + createError.toString());
        return null;
    }
  }
  
  return ss;
}


/**
 * Core function to format the JSON response.
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