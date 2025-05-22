import React, { useState } from 'react';
import { Form1Data } from '../interfaces/form1Data';
import { Form2Data } from '../interfaces/form2Data';
import { Interest } from '../interfaces/interest';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@chakra-ui/react';
import { useFetch } from '../hooks/useFetch';
import Step1Form from '../components/steps/step1Form';
import Step2Form from '../components/steps/step2Form';
import { step1Schema, step2Schema } from '../schemas/formSchemas';

const mockInterestsEndpoint = '/api/interests';
const mockSubmissionEndpoint = '/api/submit';

const RegistrationForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const { data: interests, error: fetchError } = useFetch<Interest[]>(
        mockInterestsEndpoint
    );

    const methodsStep1 = useForm<Form1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: { interests: [] },
    });

    const methodsStep2 = useForm<Form2Data>({
        resolver: zodResolver(step2Schema),
        defaultValues: {},
    });

    if (fetchError) {
        console.error('Error loading interests:', fetchError);
    }

    const onSubmitStep1 = (data: Form1Data) => {
        console.log('Step 1 Data:', data);
        setStep(2);
    };

    const onSubmitStep2 = async (data: Form2Data) => {
        const formData = new FormData();
        formData.append('avatar', data.avatar);

        try {
            const response = await fetch(mockSubmissionEndpoint, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Form submitted successfully!', result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box p={6} maxW="lg" mx="auto">
            {step === 1 && (
                <FormProvider {...methodsStep1}>
                    <Step1Form
                        onSubmit={onSubmitStep1}
                        methods={methodsStep1}
                        errors={methodsStep1.formState.errors}
                        interests={interests ?? []}
                    />
                </FormProvider>
            )}

            {step === 2 && (
                <FormProvider {...methodsStep2}>
                    <Step2Form
                        onSubmit={onSubmitStep2}
                        methods={methodsStep2}
                        errors={methodsStep2.formState.errors}
                    />
                </FormProvider>
            )}
        </Box>
    );
};

export default RegistrationForm;
