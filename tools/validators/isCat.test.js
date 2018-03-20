const isCat = require('./isCat');

test ('isCat should return true when cat have a valid type', () => {
  const cat = {
    type: 'Abyssinian'
  };

  expect(isCat(cat)).toBe.true;
});

test('isCat should return false when cat is not an object', () => {
  const cat = null;
  
  expect(isCat(cat)).toBe.false;
});
  
it('isCat should return false when cat is not a valid type', () => {
  const cat = {
    type: 'dog' 
  };
  
  expect(isCat(cat)).toBe.false;
});
