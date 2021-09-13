const fs = require('fs-extra');

(async () => {
  const src = '../satisfactory/dist/apps/trendy';
  const copy = '../satisfactory/functions/dist';

  await fs.remove(copy);
  await fs.copy(src, copy);
})();
