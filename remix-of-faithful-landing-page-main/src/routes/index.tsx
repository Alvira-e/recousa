import * as Dialog from "@radix-ui/react-dialog";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Bell, Check, Gift, Snowflake, TreePine, X } from "lucide-react";
import recoMark from "@/assets/reco-mark.png.asset.json";
import cashAppMark from "@/assets/cashapp-mark.webp.asset.json";

const TAPKR_BASE_URL = "https://taprkr.com/r/eyJ0IjoicmVjb3NvY2lhbC1jcHIiLCJ0aWQiOiIwMzgzNjkyZTRkNDgxY2YyZDgxZCIsInRzIjoxNzk1MTc1ODI0ODgyfQ";

type SampleAlert = {
  brand: "Reco" | "Cash App";
  name: string;
  amount: number;
  minutes: number;
};

const SAMPLE_ALERTS: SampleAlert[] = [
  { brand: "Reco", name: "Noah D.", amount: 377, minutes: 1 },
  { brand: "Cash App", name: "Emma S.", amount: 245, minutes: 4 },
  { brand: "Reco", name: "Liam M.", amount: 512, minutes: 7 },
  { brand: "Cash App", name: "Olivia R.", amount: 189, minutes: 11 },
  { brand: "Reco", name: "Ava T.", amount: 430, minutes: 14 },
  { brand: "Cash App", name: "Mason K.", amount: 268, minutes: 18 },
  { brand: "Reco", name: "Sophia L.", amount: 354, minutes: 22 },
  { brand: "Cash App", name: "Ethan B.", amount: 621, minutes: 27 },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Christmas CashApp Reward | CashApp Credit" },
      {
        name: "description",
        content: "Treat yourself this Christmas — a free $100 CashApp credit, unlocked in about two minutes.",
      },
      { property: "og:title", content: "Christmas CashApp Reward | CashApp Credit" },
      {
        property: "og:description",
        content: "Treat yourself this Christmas — a free $100 CashApp credit, unlocked in about two minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

export function Index() {
  const [alertIndex, setAlertIndex] = useState(0);
  const [tapkrUrl, setTapkrUrl] = useState(TAPKR_BASE_URL);

  // Carry the TikTok Ad Group source into Tapkr's S1 sub-ID.
  // The source is read from this page's URL, e.g. ?source=UK-CashApp-01.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("source");
    const trackingUrl = new URL(TAPKR_BASE_URL);

    if (source) {
      trackingUrl.searchParams.set("s1", source);
    }

    setTapkrUrl(trackingUrl.toString());
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAlertIndex((current) => (current + 1) % SAMPLE_ALERTS.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const alert = SAMPLE_ALERTS[alertIndex] ?? SAMPLE_ALERTS[0]!;
  const alertMark = alert.brand === "Reco" ? recoMark : cashAppMark;

  return (
    <main className="reward-page">
      <div className="reward-wrap">
        <div className="activity-toast" role="status" key={alertIndex}>
          <img className="toast-mark" src={alertMark.url} alt={alert.brand} />
          <div className="toast-copy">
            <strong>
              {alert.brand} <span className="example-tag">Live</span>
            </strong>
            <span>
              {alert.name} just earned <b>${alert.amount}</b> from {alert.brand}
            </span>
          </div>
          <span className="toast-time">{alert.minutes}m ago</span>
        </div>

        <section className="reward-panel" aria-label="Christmas CashApp Reward">
          <TreePine className="panel-decoration decoration-tree" aria-hidden="true" />
          <Snowflake className="panel-decoration decoration-snow-top" aria-hidden="true" />
          <Snowflake className="panel-decoration decoration-snow-bottom" aria-hidden="true" />
          <Gift className="panel-decoration decoration-gift" aria-hidden="true" />

          <img className="cash-mark" src={cashAppMark.url} alt="Cash App" />
          <div className="reward-label">
            <Bell size={17} aria-hidden="true" /> Christmas CashApp Reward
          </div>
          <p className="credit-caption">CASHAPP CREDIT</p>
          <div className="reward-amount">100</div>
          <p className="reward-description">
            Treat yourself this Christmas — a <strong>free $100 CashApp credit</strong>, unlocked in about two minutes.
          </p>
          <div className="claimers">
            <span className="live-dot" />1,320&nbsp; people claiming right now
          </div>
        </section>

        <div className="assurances" aria-label="Offer details">
          <span>
            <Check aria-hidden="true" />No credit card
          </span>
          <span>
            <Check aria-hidden="true" />Instant payout
          </span>
          <span>
            <Check aria-hidden="true" />18+ US only
          </span>
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="claim-button" type="button">
              <span>🎁 CLAIM MY $100</span>
              <ArrowRight aria-hidden="true" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="offer-overlay" />
            <Dialog.Content className="offer-dialog">
              <div className="offer-handle" aria-hidden="true" />
              <Dialog.Close className="offer-close" aria-label="Close Reco Social instructions">
                <X aria-hidden="true" />
              </Dialog.Close>

              <div className="offer-partners" aria-label="Cash App and Reco Social">
                <img src={cashAppMark.url} alt="Cash App" />
                <span aria-hidden="true">×</span>
                <img src={recoMark.url} alt="Reco Social" />
              </div>
              <p className="offer-partner-label">Cash App partner: Reco Social</p>
              <p className="offer-eyebrow">Reco Social</p>
              <Dialog.Title className="offer-title">Start using Reco Social</Dialog.Title>
              <Dialog.Description className="offer-intro">
                Download the app, open it, start the survey or games, finish it and come back here to activate your{" "}
                <strong>$100 CashApp reward.</strong>
              </Dialog.Description>

              <div className="offer-reward-card">
                <div className="offer-reward-summary">
                  <img className="offer-reward-logo" src={cashAppMark.url} alt="" />
                  <div className="offer-reward-copy">
                    <h3>Cash App Reward</h3>
                    <p>Via Reco Social</p>
                  </div>
                  <strong className="offer-reward-amount">$100</strong>
                </div>

                <a
  className="offer-download"
  href={tapkrUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  <Gift aria-hidden="true" />
  Free download on the App Store
</a>
                 </div>

              <ol className="offer-steps">
                <li>
                  <span>1</span>
                  <p>Download the app to your phone</p>
                </li>
                <li>
                  <span>2</span>
                  <p>
                    <strong>Complete surveys or play 1 game</strong> and select <strong>18+</strong> at signup to
                    unlock your $100 reward
                  </p>
                </li>
                <li>
                  <span>3</span>
                  <p>
                    Come back and <strong>finish your $100 claim</strong>
                  </p>
                </li>
              </ol>

              <a className="offer-start" href={tapkrUrl} target="_blank" rel="noopener noreferrer">
                START NOW <ArrowRight aria-hidden="true" />
              </a>
              <p className="offer-note">Takes 10 seconds — no card needed</p>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <p className="eligibility">
          No purchase. No card. <strong>18+ only.</strong>
        </p>

        <p className="disclaimer">
          This promotion is not affiliated with, sponsored, or endorsed by Cash App or Block, Inc. All trademarks are
          property of their respective owners. Must be 18+ and a US resident. Reward requires completing one qualifying
          activity on partner app. By continuing you agree to the terms of the associated third-party offers.
        </p>
      </div>
    </main>
  );
}
