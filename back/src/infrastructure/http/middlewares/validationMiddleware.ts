import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// Tipo para o schema que pode validar diferentes partes da requisição
type ValidationSchema = z.ZodObject<{
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
}>;

export const validate = (schema: ValidationSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validar apenas as partes que existem no schema
      const dataToValidate: any = {};
      
      if (schema.shape.body) {
        dataToValidate.body = req.body;
      }
      if (schema.shape.query) {
        dataToValidate.query = req.query;
      }
      if (schema.shape.params) {
        dataToValidate.params = req.params;
      }

      const validatedData = await schema.parseAsync(dataToValidate);

      // Atualizar apenas as partes validadas
      if (validatedData.body) {
        req.body = validatedData.body;
      }
      if (validatedData.query) {
        req.query = validatedData.query as any;
      }
      if (validatedData.params) {
        req.params = validatedData.params as any;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue: z.ZodIssue) => ({
          path: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        }));

        return res.status(400).json({
          status: 'error',
          message: 'Erro de validação',
          errors,
        });
      }

      next(error);
    }
  };
};

// Validador para apenas o body
export const validateBody = (schema: z.ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue: z.ZodIssue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(400).json({
          status: 'error',
          message: 'Erro de validação',
          errors,
        });
      }
      next(error);
    }
  };
};

// Validador para apenas params
export const validateParams = (schema: z.ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req.params);
      req.params = validatedData as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue: z.ZodIssue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(400).json({
          status: 'error',
          message: 'Erro de validação',
          errors,
        });
      }
      next(error);
    }
  };
};

// Validador para apenas query
export const validateQuery = (schema: z.ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req.query);
      req.query = validatedData as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue: z.ZodIssue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(400).json({
          status: 'error',
          message: 'Erro de validação',
          errors,
        });
      }
      next(error);
    }
  };
};

// Versão com class-validator
export const validateWithClassValidator = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoInstance = Object.assign(new dtoClass(), req.body);
      
      const errors = await validateDto(dtoInstance);
      
      if (errors.length > 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Erro de validação',
          errors: errors.map((err: any) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
      }

      req.body = dtoInstance;
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Função auxiliar para validação com class-validator
async function validateDto(dto: any): Promise<any[]> {
  try {
    const { validate } = await import('class-validator');
    return await validate(dto);
  } catch (error) {
    return [];
  }
}

// Middleware para validar ID em params
export const validateIdParam = (paramName: string = 'id') => {
  return validateParams(
    z.object({
      [paramName]: z.string().regex(/^\d+$/, `${paramName} deve ser um número`),
    })
  );
};