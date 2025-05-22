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
import { toaster } from '../components/ui/toaster';

const mockInterestsEndpoint = '/api/interests';
const mockSubmissionEndpoint = '/api/submit';

const RegistrationForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [step1Data, setStep1Data] = useState<Form1Data | null>(null);

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
        setStep1Data(data);
        setStep(2);
    };

    const onSubmitStep2 = async (data: Form2Data) => {
        if (!step1Data) {
            toaster.error({ title: 'Step 1 data is missing!' });
            return;
        }

        const formData = new FormData();
        if (data.avatar && data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0]);
        }

        formData.append('firstName', step1Data.firstName);
        formData.append('lastName', step1Data.lastName);
        formData.append('password', step1Data.password);
        formData.append('interests', JSON.stringify(step1Data.interests));

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
            toaster.success({ title: 'Form submitted successfully!' });
        } catch (error) {
            console.error('Error submitting form:', error);
            toaster.error({ title: 'Error submitting form!' });
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
