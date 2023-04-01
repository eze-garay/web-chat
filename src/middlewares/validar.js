const validateProduct = (req, res, next) => {
    const { name, price } = req.body
  
    // Verificar que se proporcionó un nombre y un precio válido
    if (!name || !price || typeof name !== 'string' || typeof parseFloat(price) !== 'number' || parseFloat(price) < 0) {
      return res.status(400).json({ message: 'Los datos del producto no son válidos, complete todos los datos' })
    }
  
    next()
  }

  export default validateProduct;