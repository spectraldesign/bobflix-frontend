import { Box, Center, PasswordInput, Popover, Progress, Text, rem } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text
            c={meets ? 'teal' : 'red'}
            style={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {meets ? (
                <IconCheck style={{ width: rem(14), height: rem(14) }} />
            ) : (
                <IconX style={{ width: rem(14), height: rem(14) }} />
            )}{' '}
            <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function CustomPasswordInput({ value, setValue, setError }: { value: string, setValue: (value: string) => void, setError: (error: string) => void }) {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
    ));

    const strength = getStrength(value);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.currentTarget.value;
        setValue(val);
        let errorString = '';
        requirements.forEach((requirement) => {
            if (!requirement.re.test(val)) {
                errorString += requirement.label + '\n';
            }
        });
        if (val.length < 6) {
            errorString += 'Includes at least 6 characters';
        }
        setError(errorString);


    }

    return (
        <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
            <Popover.Target>
                <Center
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                    w={"100%"}
                >
                    <PasswordInput
                        withAsterisk
                        label="Select a password"
                        placeholder="Your password"
                        value={value}
                        onChange={(event) => handleChange(event)}
                        w={"100%"}
                    />
                </Center>
            </Popover.Target>
            <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
                {checks}
            </Popover.Dropdown>
        </Popover>
    );
}