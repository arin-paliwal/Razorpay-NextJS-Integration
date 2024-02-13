import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Hero from "@/components/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const makePayment = async () => {
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key: process.env.NEXT_PUBLIC_TEST_KEY_ID,
      name: "Arin Paliwal",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "",
      handler: function (response) {
        console.log(response)
      },
      prefill: {
        name: "Arin Paliwal",
        email: "paliwalarin09@gmail.com",
        contact: "6393866066",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  return (
    <div className="">
      <Head>
        <title>Integrate Payments 🔥</title>
        <meta
          name="description"
          content="Integrate payments in your React and Next.js application with TailwindCSS and Razorpay"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-Inter h-screen overflow-auto bg-gradient-to-tr py-8">
        <Navbar />  
        <Hero onClick={makePayment} />
      </main>
    </div>
  );
}
