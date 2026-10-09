"use strict";

(() => {
  const dialog = document.getElementById("image-dialog");
  const zoomImage = document.getElementById("zoom-image");
  const zoomTitle = document.getElementById("zoom-title");
  const originalLink = document.getElementById("zoom-original");
  const closeButton = document.getElementById("close-dialog");
  let opener = null;

  if (dialog && typeof dialog.showModal === "function") {
    document.querySelectorAll("a[data-zoom]").forEach((link) => {
      link.setAttribute("aria-haspopup", "dialog");
      link.addEventListener("click", (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        const image = link.querySelector("img");
        if (!image) return;
        event.preventDefault();
        opener = link;
        zoomImage.src = link.href;
        zoomImage.alt = image.alt;
        zoomImage.width = Number(image.getAttribute("width"));
        zoomImage.height = Number(image.getAttribute("height"));
        zoomTitle.textContent = image.closest("figure").querySelector("figcaption")?.textContent || "Research figure";
        originalLink.href = link.href;
        dialog.showModal();
        document.body.classList.add("dialog-open");
        dialog.querySelector(".zoom-scroll").scrollTo(0, 0);
        closeButton.focus();
      });
    });

    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("dialog-open");
      zoomImage.removeAttribute("src");
      opener?.focus({ preventScroll: true });
      opener = null;
    });
  }

  const citation = document.getElementById("bibtex");
  const copyButton = document.getElementById("copy-citation");
  const copyStatus = document.getElementById("copy-status");

  function fallbackCopy(text) {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.setAttribute("aria-label", "Citation to copy");
    field.style.position = "fixed";
    field.style.top = "0";
    field.style.left = "-9999px";
    document.body.append(field);
    let copied = false;
    try {
      field.select();
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    } finally {
      field.remove();
      copyButton.focus({ preventScroll: true });
    }
    return copied;
  }

  if (citation && copyButton && copyStatus) {
    copyButton.hidden = false;
    copyButton.addEventListener("click", async () => {
      copyButton.disabled = true;
      copyStatus.textContent = "Copying citation…";
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          let timeout;
          try {
            await Promise.race([
              navigator.clipboard.writeText(citation.textContent),
              new Promise((_, reject) => {
                timeout = window.setTimeout(() => reject(new Error("Clipboard timed out")), 2000);
              })
            ]);
            copied = true;
          } finally {
            window.clearTimeout(timeout);
          }
        }
      } catch {
        copied = false;
      }
      if (!copied) copied = fallbackCopy(citation.textContent);
      copyButton.disabled = false;
      if (copied) {
        copyStatus.textContent = "Citation copied to clipboard.";
      } else {
        const selection = window.getSelection();
        if (selection) {
          const range = document.createRange();
          range.selectNodeContents(citation);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        copyStatus.textContent = "Automatic copying is unavailable. The citation is selected; press Ctrl+C or Command+C to copy it.";
      }
    });
  }

  function revealLinkedResult() {
    if (!window.location.hash) return;
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    if (target instanceof HTMLDetailsElement) {
      target.open = true;
      target.scrollIntoView({ block: "start" });
    }
  }
  window.addEventListener("hashchange", revealLinkedResult);
  revealLinkedResult();
})();
