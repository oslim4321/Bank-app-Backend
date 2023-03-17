let errors =  {email: '', password: '' }


module.exports.handleLoginErr = (err) => {
    if (err.message === 'Incorrect Email') {
        errors.email = 'Incorrect Email'
        errors.password = ''
    }
    if (err.message === 'Incorrect password') {
        errors.password = 'Incorrect password'
        errors.email = ''
    }
    /* Login err End*/
  
  
    return errors
  
  }