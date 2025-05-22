import React, { useState } from 'react';
import { Form1Data } from '../interfaces/form1Data';
import { Form2Data } from '../interfaces/form2Data';
import { Interest } from '../interfaces/interest';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Flex, Heading, Separator, VStack, Text } from '@chakra-ui/react';
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

        formData.append('firstName', step1Data.firstName);
        formData.append('lastName', step1Data.lastName);
        formData.append('password', step1Data.password);
        formData.append('interests', JSON.stringify(step1Data.interests));

        if (data.avatar) {
            formData.append('avatar', data.avatar, data.avatar.name);
        } else {
            console.warn('Avatar file is invalid or missing:', data.avatar);
        }

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
        <Flex minH="100vh" align="center" justify="center" px={4}>
            <Box
                bg={'white'}
                borderWidth={1}
                rounded="xl"
                shadow={'lg'}
                borderColor="gray.200"
                p={8}
                maxW="lg"
                w="100%"
            >
                <VStack align="stretch">
                    <Heading as="h2" size="xl" textAlign="center" mb={2}>
                        Register Account
                    </Heading>
                    <Text fontSize="md" color="gray.500" textAlign="center">
                        Please complete {step === 1 ? 'Step 1' : 'Step 2'} to
                        create your account.
                    </Text>

                    <Separator />

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
                </VStack>
            </Box>
        </Flex>
    );
};

export default RegistrationForm;
