import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function AtLeastOneField(
  fields: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'AtLeastOneField',
      target: object.constructor,
      propertyName,
      constraints: fields,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const obj = args.object as Record<string, any>;
          return fields.some((field) => obj[field] !== undefined);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        defaultMessage(_args: ValidationArguments): string {
          return `At least one of the fields [${fields.join(', ')}] must be provided.`;
        },
      },
    });
  };
}
