import { body } from 'express-validator';

export const validateJob = [
  body('title')
    .notEmpty().withMessage('Job title is required')
    .isLength({ max: 100 }).withMessage('Job title must be less than 100 characters'),
  
  body('description')
    .notEmpty().withMessage('Job description is required')
    .isLength({ max: 500 }).withMessage('Job description must be less than 500 characters'),
  
  body('category')
    .notEmpty().withMessage('Job category is required')
    .isIn(['Web Development', 'Graphic Design', 'Content Writing', 'SEO', 'App Development', 'Marketing', 'Other'])
    .withMessage('Invalid job category'),
  
  body('budget')
    .isNumeric().withMessage('Budget must be a number')
    .isFloat({ min: 0 }).withMessage('Budget must be a positive number'),

  body('budgetType')
    .notEmpty().withMessage('Budget type is required')
    .isIn(['Hourly', 'Fixed']).withMessage('Invalid budget type'),

  body('skillsRequired')
    .isArray().withMessage('Skills required should be an array')
    .notEmpty().withMessage('Skills required cannot be empty'),

  body('experienceLevel')
    .isIn(['Beginner', 'Intermediate', 'Expert']).withMessage('Invalid experience level'),

  body('duration')
    .isIn(['Short-term', 'Long-term', 'Ongoing']).withMessage('Invalid job duration'),
  
  body('startDate')
    .isISO8601().withMessage('Invalid start date')
    .toDate(),
  
  body('endDate')
    .optional()
    .isISO8601().withMessage('Invalid end date')
    .toDate(),

  body('location')
    .optional()
    .isObject().withMessage('Location must be a string'),

  body('remote')
    .optional()
    .isBoolean().withMessage('Remote must be a boolean'),

  body('isUrgent')
    .optional()
    .isBoolean().withMessage('isUrgent must be a boolean'),

  body('isFeatured')
    .optional()
    .isBoolean().withMessage('isFeatured must be a boolean'),

  body('attachments')
    .optional()
    .isArray().withMessage('Attachments must be an array of strings'),
];
