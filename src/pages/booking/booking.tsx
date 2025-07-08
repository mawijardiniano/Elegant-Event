import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/pages/booking/store"; // adjust path
import StepOne from "@/pages/booking/components/stepOne";
import StepTwo from "@/pages/booking/components/stepTwo";
import StepThree from "./components/stepThree";
import StepFour from "@/pages/booking/components/stepFour";
import StepFive from "./components/stepFive";
import StepSix from "@/pages/booking/components/stepSix";
import StepSeven from "@/pages/booking/components/stepSeven";
import Layout from "@/components/layout/layout";
import StepEight from "./components/stepEight";

export default function Booking() {
  const currentStep = useSelector(
    (state: RootState) => state.booking.currentStep
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      case 6:
        return <StepSix />;
      case 7:
        return <StepSeven />;
      case 8:
        return <StepEight />;
      default:
        return <StepOne />;
    }
  };

  return <Layout>{renderStep()}</Layout>;
}
