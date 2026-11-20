import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addProfileInfo } from "@/store/employeeSlice";
import { ArrowLeft, ArrowRight, SendToBack, Pencil } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function FirstTimeOnbording() {
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(0);

  const [input, setInputs] = useState({
    personal: {
      first_name: "",
      second_name: "",
      last_name: "",
    },
    contact: {
      phone_number: "",
      address: "",
    },
    medical: {
      condition: "",
    },
    next_of_keen: [
      {
        name: "",
        phone_number: "",
        alternative_number: "",
      },
      {
        name: "",
        phone_number: "",
        alternative_number: "",
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
          section: "personal",
          type: "text",
        },
        {
          label: "Second name",
          name: "second_name",
          section: "personal",
          type: "text",
        },
        {
          label: "Last name",
          name: "last_name",
          section: "personal",
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
          name: "phone_number",
          section: "contact",
          type: "tel",
        },
        { label: "Address", name: "address", section: "contact", type: "text" },
      ],
    },
    {
      step: 3,
      title: "Medical Conditions",
      description: "Tell us about any medical conditions",
      inputs: [
        {
          label: "Condition",
          name: "condition",
          section: "medical",
          type: "text",
        },
      ],
    },
    {
      step: 4,
      title: "Next of Kin",
      description: "First next of kin information",
      inputs: [
        {
          label: "Name",
          name: "name",
          section: "next_of_keen",
          index: 0,
          type: "text",
        },
        {
          label: "Phone number",
          name: "phone_number",
          section: "next_of_keen",
          index: 0,
          type: "tel",
        },
        {
          label: "Alternative number",
          name: "alternative_number",
          section: "next_of_keen",
          index: 0,
          type: "tel",
        },
      ],
    },
    {
      step: 5,
      title: "Second Next of Kin",
      description: "Optional second contact",
      inputs: [
        {
          label: "Name",
          name: "name",
          section: "next_of_keen",
          index: 1,
          type: "text",
        },
        {
          label: "Phone number",
          name: "phone_number",
          section: "next_of_keen",
          index: 1,
          type: "tel",
        },
        {
          label: "Alternative number",
          name: "alternative_number",
          section: "next_of_keen",
          index: 1,
          type: "tel",
        },
      ],
    },
    {
      step: 6,
      title: "Review Your Information",
      description: "Check your information before submitting",
      inputs: [],
    },
  ];

  const isLastStep = currentStep === steps.length;

  // Navigation
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Update form fields
  const handleInputs = (e, field) => {
    const { value } = e.target;

    if (field.section === "next_of_keen") {
      setInputs((prev) => ({
        ...prev,
        next_of_keen: prev.next_of_keen.map((person, index) =>
          index === field.index ? { ...person, [field.name]: value } : person,
        ),
      }));

      return;
    }

    setInputs((prev) => ({
      ...prev,
      [field.section]: {
        ...prev[field.section],
        [field.name]: value,
      },
    }));
  };

  // Submit
  const submitProfileData = () => {
    // Transform your data here if your backend expects another structure.
    console.log("Submitting profile:", input);

    dispatch(addProfileInfo(input));
  };

  // Review screen
  const ReviewSection = ({ title, children }) => (
    <div className="border rounded-lg p-4 space-y-2">
      <h3 className="font-semibold text-base">{title}</h3>
      {children}
    </div>
  );

  const ReviewItem = ({ label, value }) => (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right break-words">
        {value || "Not provided"}
      </span>
    </div>
  );

  return (
    <section className="w-full min-h-screen flex absolute z-50 top-0 left-0 bg-card">
      {/* Welcome */}
      <div
        className={`${
          currentStep === 0
            ? "flex flex-1 items-center px-2 justify-center"
            : "hidden"
        }`}
      >
        <h1 className="font-bold text-accent tracking-widest text-2xl capitalize">
          Welcome to RoyalAutoGarage
        </h1>
      </div>

      <div className="flex flex-1">
        <div className="flex flex-1 items-center justify-center px-3 py-6">
          <form
            className="w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();

              if (isLastStep) {
                submitProfileData();
              }
            }}
          >
            <div className="w-full flex justify-center items-center rounded-lg p-4">
              {/* Welcome screen */}
              {currentStep === 0 && (
                <div className="flex flex-col items-center justify-center gap-5">
                  <p>Let's get your account set up.</p>

                  <Button type="button" className="h-11" onClick={handleNext}>
                    Begin <ArrowRight />
                  </Button>
                </div>
              )}

              {/* Form steps */}
              {steps.map((singleStep) => {
                if (currentStep !== singleStep.step) return null;

                return (
                  <div key={singleStep.step} className="w-full">
                    <div className="flex flex-col items-center justify-center mb-5">
                      <h2 className="text-xl font-semibold mb-1 capitalize">
                        {singleStep.title}
                      </h2>

                      <p className="text-sm text-muted-foreground text-center">
                        {singleStep.description}
                      </p>
                    </div>

                    {/* Review screen */}
                    {singleStep.step === 6 ? (
                      <div className="w-full space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                        <ReviewSection title="Personal Information">
                          <ReviewItem
                            label="First name"
                            value={input.personal.first_name}
                          />
                          <ReviewItem
                            label="Second name"
                            value={input.personal.second_name}
                          />
                          <ReviewItem
                            label="Last name"
                            value={input.personal.last_name}
                          />
                        </ReviewSection>

                        <ReviewSection title="Contact Information">
                          <ReviewItem
                            label="Phone number"
                            value={input.contact.phone_number}
                          />
                          <ReviewItem
                            label="Address"
                            value={input.contact.address}
                          />
                        </ReviewSection>

                        <ReviewSection title="Medical Information">
                          <ReviewItem
                            label="Condition"
                            value={input.medical.condition || "None provided"}
                          />
                        </ReviewSection>

                        <ReviewSection title="Next of Kin">
                          {input.next_of_keen.map((person, index) => {
                            const hasDetails = Object.values(person).some(
                              (value) => value.trim() !== "",
                            );

                            if (!hasDetails) return null;

                            return (
                              <div
                                key={index}
                                className="space-y-2 border-b last:border-0 pb-3 last:pb-0"
                              >
                                <p className="font-medium text-sm">
                                  Contact {index + 1}
                                </p>

                                <ReviewItem label="Name" value={person.name} />
                                <ReviewItem
                                  label="Phone number"
                                  value={person.phone_number}
                                />
                                <ReviewItem
                                  label="Alternative number"
                                  value={person.alternative_number}
                                />
                              </div>
                            );
                          })}

                          {!input.next_of_keen.some((person) =>
                            Object.values(person).some(
                              (value) => value.trim() !== "",
                            ),
                          ) && (
                            <p className="text-sm text-muted-foreground">
                              No next-of-kin information provided.
                            </p>
                          )}
                        </ReviewSection>
                      </div>
                    ) : (
                      /* Normal input fields */
                      singleStep.inputs.map((field) => {
                        const fieldId = `${field.section}-${field.index ?? "main"}-${field.name}`;

                        return (
                          <div key={fieldId} className="mb-4">
                            <label
                              htmlFor={fieldId}
                              className="block text-sm font-medium mb-1 capitalize"
                            >
                              {field.label}
                            </label>

                            <Input
                              id={fieldId}
                              name={field.name}
                              type={field.type}
                              value={
                                field.section === "next_of_keen"
                                  ? (input.next_of_keen[field.index]?.[
                                      field.name
                                    ] ?? "")
                                  : input[field.section][field.name]
                              }
                              onChange={(e) => handleInputs(e, field)}
                              className="h-11"
                            />
                          </div>
                        );
                      })
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation */}
            {currentStep !== 0 && (
              <div className="flex items-center justify-between h-11 mt-3">
                <Button type="button" variant="ghost" onClick={handleBack}>
                  <ArrowLeft /> Back
                </Button>

                {isLastStep ? (
                  <Button type="submit">
                    Finish <SendToBack />
                  </Button>
                ) : (
                  <Button type="button" variant="ghost" onClick={handleNext}>
                    Next <ArrowRight />
                  </Button>
                )}
              </div>
            )}

            {/* Progress indicators */}
            <div className="flex items-center justify-center mt-4">
              {steps.map((step) => (
                <div
                  key={step.step}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    currentStep === step.step ? "bg-accent" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
