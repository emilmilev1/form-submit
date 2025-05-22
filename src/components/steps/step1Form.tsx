import React from 'react';
import {
    Input,
    Checkbox,
    Button,
    CheckboxGroup,
    Stack,
    CheckboxRoot,
    Flex,
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
    const { register, handleSubmit } = methods;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <>
                {/* Names Input */}
                <Flex>
                    <FormControl mr="5%">
                        <FormLabel htmlFor="first-name">First Name</FormLabel>
                        <Input
                            id="first-name"
                            placeholder="Enter your first name"
                            {...register('firstName')}
                            borderColor="teal.400"
                            autoComplete="given-name"
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
                            autoComplete="family-name"
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
                        autoComplete="new-password"
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
                        autoComplete="new-password"
                    />
                    <FormErrorMessage>
                        {errors.confirmPassword?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.interests}>
                    <FormLabel as={'legend'}>Interests</FormLabel>
                    <CheckboxGroup>
                        <Stack>
                            {interests.map((interest) => (
                                <CheckboxRoot
                                    id={`interest-${interest.id}`}
                                    key={interest.id}
                                    value={interest.name}
                                    {...register('interests')}
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

                <Button
                    id="next-button"
                    type="submit"
                    w="7rem"
                    colorScheme="teal"
                    variant="outline"
                >
                    Next
                </Button>
            </>
        </form>
    );
};

export default Step1Form;
