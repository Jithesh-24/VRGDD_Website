// ==========================================================================
// Security & Anti-Theft Lock
// ==========================================================================
(function() {
  const allowedHosts = ["localhost", "127.0.0.1"];
  const hostname = window.location.hostname;
  const isNetlify = hostname.endsWith(".netlify.app");
  const isAllowed = allowedHosts.includes(hostname) || isNetlify;

  if (!isAllowed) {
    // Lock the website if hosted elsewhere
    window.stop(); // Stop loading resources
    document.documentElement.innerHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Development Preview Mode</title>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Inter:wght@300;400&display=swap" rel="stylesheet">
        <style>
          body {
            background-color: #070708;
            color: #eae6df;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
          }
          .lock-card {
            max-width: 500px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 50px 30px;
            background-color: #17171a;
            border-radius: 4px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          }
          .lock-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 32px;
            color: #c5a880;
            margin-bottom: 20px;
            letter-spacing: 2px;
          }
          .lock-text {
            font-size: 14px;
            line-height: 1.6;
            color: #b8b5af;
            margin-bottom: 30px;
          }
          .lock-footer {
            font-size: 11px;
            color: rgba(255,255,255,0.2);
            letter-spacing: 1px;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="lock-card">
          <div class="lock-title">VRG DESIGN DEN</div>
          <p class="lock-text">
            This website is currently in <strong>Development Preview Mode</strong>.<br>
            A valid license is required to activate this domain.
          </p>
          <div class="lock-footer">Protected by Developer License</div>
        </div>
      </body>
      </html>
    `;
    throw new Error("License verification failed. Domain locked.");
  }

  // Prevent Right-Click and Common Inspect Keys
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("keydown", e => {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
      (e.ctrlKey && (e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S"))
    ) {
      e.preventDefault();
      return false;
    }
  });
})();
