module.exports = {
 "extends": "airbnb-base",
 "env": {
  "browser": true
 },
 "rules": {
   "no-restricted-syntax": [
    "off",
     {
       "selector": "ForOfStatement",
       "message": "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Seperately, loops should be avoided in favor of array iterations."
     }
   ],
   "no-await-in-loop": [
     "off",
   ]
 },
};