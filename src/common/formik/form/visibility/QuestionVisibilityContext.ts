import { createContext } from 'react';
import { QuestionVisibility } from '../../utils/questions/Question';

interface VisibilityContext<FieldName> {
    visibility: QuestionVisibility<FieldName>;
}

export const QuestionVisibilityContext = createContext<VisibilityContext<any> | undefined>(undefined);
