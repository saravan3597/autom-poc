const scripts = document.getElementById("scriptSelector");

document.getElementById("playBtn").addEventListener("click", async () => {
  const scriptValue = scripts.value;
  scripts.disabled = true;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: fillGoogleSearch,
    args: [scriptValue],
  });
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  alert("Pause not implemented yet.");
});

document.getElementById("stopBtn").addEventListener("click", () => {
  alert("Script execution stopped");
});

// This will be injected into the page
function fillGoogleSearch(query) {
  const input = document.querySelector("textarea");
  if (input) {
    input.value = query;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    const form = input.closest("form");
    if (form) form.submit();
  }
}
