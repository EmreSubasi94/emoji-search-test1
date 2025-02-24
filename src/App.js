import React, { useState } from "react";
import "./App.css";
const emojiList = [
  { emoji: "💯", name: "100" },
  { emoji: "🔢", name: "1234" },
  { emoji: "😀", name: "Grinning" },
  { emoji: "😬", name: "Grimacing" },
  { emoji: "😁", name: "Grin" },
  { emoji: "😂", name: "Joy" },
  { emoji: "😃", name: "Smiley" },
  { emoji: "😄", name: "Smile" },
  { emoji: "😅", name: "Sweat Smile" },
];

export default function EmojiSearch() {
  const [search, setSearch] = useState("");

  const filteredEmojis = emojiList.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.emoji.includes(search)
  );

  const copyToClipboard = (emoji) => {
    navigator.clipboard.writeText(emoji);
    alert(`Copied: ${emoji}`);
  };

  return (
    <div className="container mt-5">
      <h1 id="baslik1" className="text-center mb-4">
        🐱 Emoji Search 🐱
      </h1>
      <input
        type="text"
        data-testid="input"
        className="form-control mb-3"
        placeholder="Search emojis..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="list-group">
        {filteredEmojis.map((emoji) => (
          <button
            data-testid="button"
            key={emoji.name}
            data-clipboard-text={emoji.emoji}
            onClick={() => copyToClipboard(emoji.emoji)}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <span className="fs-4">{emoji.emoji}</span>
            <span data-testid="emoji">{emoji.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
