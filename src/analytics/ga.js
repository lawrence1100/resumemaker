import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-CMQT1VF6XM";

let inited = false;

export default function GATracker() {
  const location = useLocation();

  useEffect(() => {
    if (!inited) {
      ReactGA.initialize(MEASUREMENT_ID);
      inited = true;
    }
  }, []);

  useEffect(() => {
    if (!inited) return;
    const page = location.pathname + location.search;
    ReactGA.send({ hitType: "pageview", page });
  }, [location]);

  return null;
}