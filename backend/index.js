import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Integration React.js & MercadoPago Test"));

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      body: {
        items: [
          {
            title: req.body.title,
            unit_price: Number(req.body.unit_price),
            quantity: Number(req.body.quantity),
            currency_id: "MXN",
          }
        ],
        back_urls: {
          success: "www.google.com",
          failure: "www.google.com",
          pending: "www.google.com"
        }
      }
    };

    const newPreference = new Preference(client);
    const filledPreference = await newPreference.create(body);
    res.json({ id: filledPreference.id });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))