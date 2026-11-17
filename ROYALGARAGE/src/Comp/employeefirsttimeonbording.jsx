import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, SendToBack } from "lucide-react";
import { useState } from "react";

export default function FirstTimeOnbording() {
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInputs] = useState({
    first_name: "",
    second_name: "",
    last_name: "",
    phoneNumber: "",
    address: "",
    condtion: "",
    nextofKeen: [
      {
        name: "",
        phone_number: "",
        altanative_phone_number: "",
      },
    ],
  });
  const steps = [
    {
      step: 1,
      title: "Personal Information",
      description: "Tell us about yourself",
      inputs: [
        {
          label: "First name",
          name: "first_name",
          type: "text",
        },
        {
          label: "Second name",
          name: "second_name",
          type: "text",
        },
        {
          label: "Last name",
          name: "last_name",
          type: "text",
        },
      ],
    },
    {
      step: 2,
      title: "Contact Information",
      description: "How can we reach you?",
      inputs: [
        {
          label: "Phone number",
          name: "phoneNumber",
          type: "tel",
        },
        {
          label: "Address",
          name: "address",
          type: "text",
        },
      ],
    },
    {
      step: 3,
      title: "medical condtions",
      description: "any medical condtions",
      inputs: [
        {
          label: "condtion",
          name: "condtion",
          type: "text",
        },
      ],
    },
    {
      step: 4,
      title: "next of keen",
      description: "next of keen info",
      inputs: [
        {
          label: "name",
          name: "name",
          type: "text",
        },
        {
          label: "phone number",
          name: "phone number",
          type: "text",
        },
        {
          label: "alatanitive number",
          name: "alatanitive number",
          type: "text",
        },
      ],
    },
    {
      step: 5,
      title: "next of keen",
      description: "2 nd next of keen if not skip",
      inputs: [
        {
          label: "name",
          name: "name",
          type: "text",
        },
        {
          label: "phone number",
          name: "phone number",
          type: "text",
        },
        {
          label: "alatanitive number",
          name: "alatanitive number",
          type: "text",
        },
      ],
    },
  ];

  // Move to next step
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };
  // Move to previous step
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  console.log(input);

  return (
    <section className=" w-full h-screen flex  ">
      <div
        className={`  ${currentStep === 0 ? "flex flex-1 items-center px-2  justify-center " : "hidden"} `}
      >
        <h1 className="font-bold text-accent tracking-widest text-2xl capitalize">
          welcome to RoyalAutoGarage
        </h1>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-1 items-center justify-center px-3 border">
          <form className="w-full max-w-md">
            <div className="w-full min-h-67  rounded-lg p-4 border">
              {currentStep === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-3.5">
                  <p>Let's get your account set up.</p>
                  <Button onClick={() => handleNext()}>
                    Begin <ArrowRight />
                  </Button>
                </div>
              )}

              {steps.map((singleStep) => {
                if (currentStep === singleStep.step) {
                  return (
                    <div key={singleStep.step}>
                      <h2 className="text-xl font-semibold mb-1">
                        {singleStep.title}
                      </h2>

                      <p className="text-sm text-muted-foreground mb-5">
                        {singleStep.description}
                      </p>

                      {singleStep.inputs.map((field) => (
                        <div key={field.name} className="mb-4">
                          <label
                            htmlFor={field.name}
                            className="block text-sm font-medium mb-1"
                          >
                            {field.label}
                          </label>

                          <Input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={input[field.name]}
                            onChange={handleInputs}
                            className="h-11"
                          />
                        </div>
                      ))}
                    </div>
                  );
                }

                return null;
              })}
            </div>

            <div
              className={` ${currentStep === 0 ? "hidden" : "flex items-center justify-between h-11 mt-3"}`}
            >
              <Button variant="ghost" onClick={() => handleBack()}>
                <ArrowLeft /> Back
              </Button>

              <Button variant="ghost" onClick={() => handleNext()}>
                Next <ArrowRight />
              </Button>
            </div>
            <div className="flex items-center justify-center mt-3">
              {steps.map((step) => {
                return (
                  <div
                    key={step.step}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      currentStep === step.step ? "bg-accent" : "bg-gray-300"
                    }`}
                  ></div>
                );
              })}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
