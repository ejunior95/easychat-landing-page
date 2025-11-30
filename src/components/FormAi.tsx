import type { FormAIOptions } from '@ejunior95/formai-core';
import { useAIForm } from '@ejunior95/formai-react';
import { IMaskInput } from 'react-imask';
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

type MaskPatterns = FormAIOptions['maskPatterns'];

interface FieldTesterProps {
    prompt: string;
    patterns?: MaskPatterns;
    onChange?: (value: string) => void;
    onValidate?: (isValid: boolean) => void;
    onEnter?: () => void;
}

function FieldTester({
    prompt,
    patterns,
    onChange,
    onValidate,
    onEnter,
}: FieldTesterProps) {
    const {
        value,
        setValue,
        error,
        validate,
        loading,
        config
    } = useAIForm(prompt, {
        maskPatterns: patterns
    });
    const { language } = useLanguage();

    useEffect(() => {
        if (onValidate) {
            const isValid = !error && value && value.trim().length > 0;
            onValidate(!!isValid);
        }
    }, [error, value, onValidate]);

    const handleChange = (newValue: string) => {
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (!value || value.trim().length === 0) {
                validate();
                return;
            }

            if (config?.validation?.regex) {
                try {
                    const regex = new RegExp(config.validation.regex);
                    if (!regex.test(value)) {
                        validate();
                        return;
                    }
                } catch (err) {
                    console.error("Erro ao testar regex:", err);
                }
            }

            if (error) {
                validate();
                return;
            }

            if (onEnter) {
                onEnter();
            }
        }
    };

    if (loading) {
        return (
            <div className="flex text-sm text-muted-foreground animate-pulse">
                <p>{language === 'pt' ? 'Gerando input via FormAI' : 'Generating input by FormAI'}</p>
                <Loader className="inline-block ml-2 h-4 w-4 animate-spin" />
            </div>
        );
    }

    if (!config) {
        return <div className="text-red-500 text-sm">Erro: {error || "Falha na configuração."}</div>;
    }

    // console.log('Configuração da IA: ', JSON.stringify(config, null, 2));

    return (
        <div>
            {config.type === 'mask-text' && config.mask ? (
                <IMaskInput
                    id="domain-mask"
                    mask={config.mask}
                    placeholder={language === 'pt' ? "exemplo.com.br" : "example.com"}
                    value={value}
                    onAccept={(val: string) => handleChange(val)}
                    onBlur={validate}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-red-500' : ''}`}
                    onKeyDown={handleKeyDown}
                    definitions={{
                        '#': /[0-9]/,
                        'a': /[A-Za-z]/,
                        '*': /[A-Za-z0-9]/
                    }}
                />
            ) : (
                <Input
                    id="domain-input"
                    placeholder={language === 'pt' ? "exemplo.com.br" : "example.com"}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    className={error ? 'border-red-500' : ''}
                    onBlur={validate}
                    onKeyDown={handleKeyDown}
                />
            )}
            {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
        </div>
    );
}

function FormAI({
    prompt,
    patterns,
    onChange,
    onValidate,
    onEnter,
}: FieldTesterProps) {
    return (
        <FieldTester
            prompt={prompt}
            patterns={patterns}
            onChange={onChange}
            onValidate={onValidate}
            onEnter={onEnter}
        />
    );
}

export default FormAI;