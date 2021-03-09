const { body, param } = require("express-validator");

const validateEvent = (method) => {
	switch(method) {
		case 'create': {
			return [
				body('title').exists().withMessage('Título obrigatório')
				.isLength({min: 1, max: 50}).withMessage(
					'O título deve ter entre 1 a 50 caracteres'
				),
				
				body('description').exists()
				.withMessage('A descrição é obrigatória')
				.isLength({min: 5, max: 250}).withMessage(
					'A descrição deve conter entre 5 a 250 caracteres'
				),

				body('price').exists().withMessage('O preço é obrigatório')
				.isFloat().withMessage(
					'O preço deve ser um número inteiro ou decimal.'),

				body('starts_at').exists().withMessage(
					'O evento precisa ter data e hora de início.'
					).isDate().withMessage('Data/hora com formato inválido'),
				
				body('ends_at').exists().withMessage(
					'O evento precisa ter data e hora de encerramento.'
				).isDate().withMessage('Data/hora com formato inválido'),
					
				body('contact_number').exists().withMessage(
					'Número de contato não informado').isNumeric()
					.withMessage('Número de contato inválido.')
					.isLength({min: 11, max: 11}).withMessage(
						'O número de contato precisa ter 11 digitos.'
					),
				
				body('latitude').exists().withMessage('Latitude não informada')
				.isFloat().withMessage(
					'A Latitude deve ser um número inteiro ou decimal.'),
				
				body('longitude').exists().withMessage(
					'Longitude não informada').isFloat().withMessage(
					'A Longitude deve ser um número inteiro ou decimal.'),
				
				body('address').exists().withMessage('Endereço não informado')
				.isLength({min: 5, max: 500}).withMessage(
					'O endereço deve conter entre 5 a 500 caracteres')
			];
		}
		
		case 'update': {
			return [
				body('title').optional().isLength({min: 1, max: 50})
				.withMessage('O título deve ter entre 1 a 50 caracteres'),

				body('description').optional().isLength({min: 5, max: 250})
				.withMessage(
					'A descrição deve conter entre 5 a 250 caracteres'
				),

				body('starts_at').optional().isDate()
				.withMessage('Data/hora com formato inválido.'),

				body('ends_at').optional().isDate().withMessage(
					'Data/hora com formato inválido.'
					),

				body('contact_number').optional().isNumeric()
				.withMessage('Número de contato inválido').isLength({
					min: 11, 
					max: 11
				}).withMessage('O número de contato precisa ter 11 digitos'),
				
				body('latitude').optional().isFloat().withMessage(
					'A latitude deve ser um número inteiro ou decimal.'),
				
				body('longitude').optional().isFloat().withMessage(
					'A longitude deve ser um número inteiro ou decimal.'
				),

				body('address').optional().isLength({min: 5, max: 500})
				.withMessage('O endereço deve conter entre 5 a 500 caracteres.'),

				body('price').optional().isNumeric().withMessage(
					'O preço deve ser um número inteiro ou decimal.'
				)
			];
		}
	}
}

module.exports = {
	validateEvent
}