import React from 'react';
import {
    Input,
    Checkbox,
    Button,
    CheckboxGroup,
    Stack,
    CheckboxRoot,
    Heading,
    Flex,
    Box,
    InputElement,
} from '@chakra-ui/react';
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from '@chakra-ui/form-control';
import { UseFormReturn } from 'react-hook-form';
import { Form1Data } from '../../interfaces/form1Data';
import { Interest } from '../../interfaces/interest';

interface Step1FormProps {
    onSubmit: (data: Form1Data) => void;
    errors: UseFormReturn<Form1Data>['formState']['errors'];
    interests: Interest[];
    methods: UseFormReturn<Form1Data>;
}

const Step1Form: React.FC<Step1FormProps> = ({
    onSubmit,
    methods,
    errors,
    interests,
}) => {
    const { register } = methods;

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <>
                <Heading
                    w="100%"
                    textAlign={'center'}
                    fontWeight="normal"
                    mb="2%"
                >
                    User Registration
                </Heading>

                {/* Names Input */}
                <Flex>
                    <FormControl mr="5%">
                        <FormLabel htmlFor="first-name">First Name</FormLabel>
                        <Input
                            id="first-name"
                            placeholder="Enter your first name"
                            {...register('firstName')}
                            borderColor="teal.400"
                        />
                        <FormErrorMessage>
                            {errors.firstName?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="last-name">Last Name</FormLabel>
                        <Input
                            id="last-name"
                            placeholder="Enter your last name"
                            {...register('lastName')}
                            borderColor="teal.400"
                        />
                        <FormErrorMessage>
                            {errors.lastName?.message}
                        </FormErrorMessage>
                    </FormControl>
                </Flex>

                {/* Password Input */}
                <FormControl isInvalid={!!errors.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        {...register('password')}
                        borderColor="teal.400"
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>

                {/* Confirm Password Input */}
                <FormControl isInvalid={!!errors.confirmPassword}>
                    <FormLabel htmlFor="confirm-password">
                        Confirm Password
                    </FormLabel>
                    <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Re-enter your password"
                        {...register('confirmPassword')}
                        borderColor="teal.400"
                    />
                    <FormErrorMessage>
                        {errors.confirmPassword?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.interests}>
                    <FormLabel htmlFor="interests">Interests</FormLabel>
                    <CheckboxGroup>
                        <Stack>
                            {interests.map((interest) => (
                                <CheckboxRoot
                                    id={`interest-${interest.id}`}
                                    key={interest.id}
                                    value={interest.id.toString()}
                                    {...methods.register('interests')}
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label>
                                        {interest.name}
                                    </Checkbox.Label>
                                </CheckboxRoot>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </FormControl>

                <Button type="submit">Next</Button>
            </>
        </form>
    );
};

export default Step1Form;
