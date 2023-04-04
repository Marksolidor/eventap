import { useState, useEffect } from "react";

function useEventData() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const jsonData = async () => {
      try {
        const response = await fetch("http://localhost:8080/events");
        const data = await response.json();
        setEvents(data);
      } catch (e) {
        alert("Mensaje del Servidor: No se pudo establecer la conexión");
      }
    };
    jsonData();
  }, []);

  return events;
}

export default useEventData;
