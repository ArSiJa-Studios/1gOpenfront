import React, { useState } from "react";
import axios from "axios";

export default function JoinPrivateModal({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    try {
      const endpoint = mode === "login" ? "/api/login" : "/api/register";
      const res = await axios.post(endpoint, { username, password });
      if (res.data.success) {
        setMessage("Erfolgreich!");
        onSuccess();
      } else {
        setMessage(res.data.error || "Fehler beim Login/Registrieren");
      }
    } catch (err) {
      setMessage("Verbindung fehlgeschlagen");
    }
  }

  return (
    <div className="modal">
      <h2>{mode === "login" ? "Login" : "Registrieren"}</h2>
      <input placeholder="Benutzername" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>{mode === "login" ? "Einloggen" : "Konto erstellen"}</button>
      <p onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "Noch kein Konto? Registrieren" : "Schon registriert? Login"}
      </p>
      <p>{message}</p>
    </div>
  );
}
