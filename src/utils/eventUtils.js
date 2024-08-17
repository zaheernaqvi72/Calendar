export const getDateString = date => {
    return date.toISOString().split('T')[0];
  };
  
  export const categories = ['Work', 'Personal'];