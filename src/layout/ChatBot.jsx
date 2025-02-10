import React, { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    // Cargar el script del chat
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/01/23/01/20250123012617-O1GA5PKN.js';
    script2.async = true;
    document.body.appendChild(script2);

    // Limpiar los scripts cuando el componente se desmonte
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null; // No necesitamos renderizar nada en el DOM
};

export default ChatBot;