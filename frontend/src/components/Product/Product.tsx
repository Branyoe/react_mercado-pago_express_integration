import { Wallet } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";

async function createPreference(apiUrl: string) {
  const data = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        title: 'Papa',
        unit_price: 5,
        quantity: 1
      }
    )
  })
    .then(response => response.json())
    .catch(error => console.error(error));

  return data.id;
}



export default function Product() {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    handlePreference();
  }, [])

  async function handlePreference() {
    const preferenceId = await createPreference(`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/create_preference`);
    setPreferenceId(preferenceId);
  }

  return (
    <div>
      <h1>Product name: Papa</h1>
      <h2>Price: $5</h2>
      {
        preferenceId && (
          <Wallet initialization={{ preferenceId }} />
        )
      }
    </div>
  );
}