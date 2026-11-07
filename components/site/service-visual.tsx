import { Cloud, Layers3 } from "lucide-react";
import type { ServiceId } from "@/lib/site-content";

export function ServiceVisual({ kind }: { kind: ServiceId }) {
  return (
    <div className={`service-visual service-visual-${kind}`} aria-hidden="true">
      <div className="device-shadow" />
      {kind === "websites" && (
        <div className="laptop-device">
          <div className="laptop-screen">
            <div className="mini-navbar">
              <i />
              <span />
              <span />
              <span />
            </div>
            <div className="mini-website">
              <div>
                <span className="mini-eyebrow">DESIGNED TO MOVE YOU</span>
                <strong>
                  A better way
                  <br />
                  forward.
                </strong>
                <span className="mini-button" />
              </div>
              <div className="mini-sphere" />
            </div>
            <div className="mini-web-footer">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="laptop-base" />
        </div>
      )}
      {kind === "web-apps" && (
        <div className="dashboard-device">
          <div className="dashboard-sidebar">
            <i />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="dashboard-main">
            <div className="dashboard-header">
              <span>Overview</span>
              <i />
            </div>
            <div className="dashboard-stats">
              <i />
              <i />
              <i />
            </div>
            <div className="dashboard-chart">
              <span>YOUR NEXT CHAPTER</span>
              <svg viewBox="0 0 220 80" fill="none">
                <path
                  d="M0 70 C20 70 20 48 40 54 S65 69 80 41 S104 55 125 27 S150 45 170 17 S200 25 220 3"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  d="M0 70 C20 70 20 48 40 54 S65 69 80 41 S104 55 125 27 S150 45 170 17 S200 25 220 3 V80 H0Z"
                  fill="currentColor"
                  opacity=".1"
                />
              </svg>
            </div>
            <div className="dashboard-rows">
              <span />
              <span />
            </div>
          </div>
        </div>
      )}
      {kind === "mobile-apps" && (
        <>
          <div className="phone-device phone-back">
            <div className="phone-island" />
            <span className="phone-tiny-label">Made for every day.</span>
            <div className="phone-tiles">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="phone-device phone-front">
            <div className="phone-island" />
            <div className="phone-time">9:41</div>
            <div className="phone-orb" />
            <span className="phone-heading">
              A little more
              <br />
              possibility.
            </span>
            <div className="phone-action">
              Let&apos;s go <span>↗</span>
            </div>
            <div className="phone-home" />
          </div>
        </>
      )}
      {kind === "saas" && (
        <div className="saas-device">
          <div className="saas-layer saas-layer-bottom" />
          <div className="saas-layer saas-layer-middle">
            <Layers3 />
          </div>
          <div className="saas-layer saas-layer-top">
            <Cloud />
            <span>YOUR NEXT BIG THING</span>
            <div className="saas-status">
              <i />
              Connected possibilities
            </div>
          </div>
          <div className="saas-node saas-node-one" />
          <div className="saas-node saas-node-two" />
        </div>
      )}
    </div>
  );
}
