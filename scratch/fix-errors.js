const fs = require('fs');

const path = 'src/components/registration-form.tsx';
let content = fs.readFileSync(path, 'utf-8');

// The fields that need standard error message injection
const fields = [
  'full_name', 'email', 'dob', 'gender', 'address', 'district', 'state', 
  'qualification', 'college_name', 'course_stream', 'year_semester', 
  'computer_knowledge', 'social_media_knowledge', 'work_interests', 
  'nss_ncc_connected', 'available_6_months', 'motivation'
];

// Let's remove the incorrectly added {errors.state && ...} and {errors.gender && ...} from the wrong places
content = content.replace(/\{\s*errors\.state\s*&&\s*<p className="text-sm text-destructive">\{errors\.state\.message\}<\/p>\s*\}/g, '');
content = content.replace(/\{\s*errors\.gender\s*&&\s*<p className="text-sm text-destructive">\{errors\.gender\.message\}<\/p>\s*\}/g, '');

fields.forEach(field => {
  // Check if error already exists for this field
  const errRegex = new RegExp(`\\{errors\\.${field}\\s*&&`);
  if (!errRegex.test(content)) {
    // For most inputs, we look for `...register("${field}")}`
    if (content.includes(`...register("${field}")}`)) {
      const parts = content.split(`...register("${field}")} />`);
      if (parts.length === 2) {
        content = parts[0] + `...register("${field}")} />\n              {errors.${field} && <p className="text-sm text-destructive">{errors.${field}.message}</p>}` + parts[1];
        return;
      }
    }
    
    // For Select and RadioGroup, look for `name="${field}"` up to `/>`
    const selectRegex = new RegExp(`(name="${field}"[\\s\\S]*?<\\/(?:Select|RadioGroup)>)(\\s*)}?\\s*\\/>`);
    const match = content.match(selectRegex);
    if (match) {
      content = content.replace(selectRegex, `$1$2} />\n              {errors.${field} && <p className="text-sm text-destructive">{errors.${field}.message}</p>}`);
      return;
    }

    // fallback for Controller wrapping Select
    const controllerRegex = new RegExp(`(name="${field}"[\\s\\S]*?<\\/Select>\\s*\\n\\s*\\}\\s*\\)\\}\\s*\\/>)`);
    const match2 = content.match(controllerRegex);
    if (match2) {
      content = content.replace(controllerRegex, `$1\n              {errors.${field} && <p className="text-sm text-destructive">{errors.${field}.message}</p>}`);
      return;
    }

    // fallback for Controller wrapping RadioGroup
    const radioRegex = new RegExp(`(name="${field}"[\\s\\S]*?<\\/RadioGroup>\\s*\\n\\s*\\}\\s*\\)\\}\\s*\\/>)`);
    const match3 = content.match(radioRegex);
    if (match3) {
      content = content.replace(radioRegex, `$1\n              {errors.${field} && <p className="text-sm text-destructive">{errors.${field}.message}</p>}`);
      return;
    }

    // For work_interests (checkbox array)
    if (field === 'work_interests') {
       const wRegex = /(name="work_interests"[\s\S]*?\n\s*\}\)\}\s*<\/div>)/;
       content = content.replace(wRegex, `$1\n            {errors.work_interests && <p className="text-sm text-destructive">{errors.work_interests.message}</p>}`);
       return;
    }
    
    // motivation
    if (field === 'motivation') {
        const mRegex = /(id="motivation"[\s\S]*?\.\.\.register\("motivation"\)\}\s*\/>)/;
        content = content.replace(mRegex, `$1\n            {errors.motivation && <p className="text-sm text-destructive">{errors.motivation.message}</p>}`);
        return;
    }
  }
});

fs.writeFileSync(path, content);
console.log('Fixed errors in registration form');
