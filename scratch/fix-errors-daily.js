const fs = require('fs');

const path = 'src/components/daily-report-form.tsx';
let content = fs.readFileSync(path, 'utf-8');

const fields = [
  'fellow_name', 'whatsapp', 'district', 'college_name', 'report_date', 'reporting_day',
  'work_types', 'work_description', 
  'entrepreneurs_contacted', 'students_contacted', 'field_visits', 'business_profiles',
  'success_stories', 'schemes_studied', 'social_posts', 'meetings_attended',
  'business_name', 'business_location', 'business_category', 'contact_person', 'contact_number', 'business_observation',
  'scheme_name', 'scheme_details',
  'institution_name', 'students_spoken', 'interested_students', 'startup_idea_details',
  'achievement', 'challenges', 'tomorrow_plan'
];

fields.forEach(field => {
  const errRegex = new RegExp(`\\{errors\\.${field}\\s*&&`);
  if (!errRegex.test(content)) {
    if (content.includes(`...register("${field}")}`)) {
      const parts = content.split(`...register("${field}")} />`);
      if (parts.length === 2) {
        content = parts[0] + `...register("${field}")} />\n              {errors.${field} && <p className="text-sm text-destructive">{errors.${field}.message}</p>}` + parts[1];
        return;
      }
    }
    
    const selectRegex = new RegExp(`(name="${field}"[\\s\\S]*?<\\/Select>)(\\s*\\n\\s*\\}\\s*\\)\\}\\s*\\/>)`);
    const match = content.match(selectRegex);
    if (match) {
      content = content.replace(selectRegex, `$1$2\n              {errors.${field} && <p className="text-sm text-destructive">{errors.${field}.message}</p>}`);
      return;
    }

    if (field === 'work_types') {
       const wRegex = /(name="work_types"[\s\S]*?\n\s*\}\)\}\s*<\/div>)/;
       content = content.replace(wRegex, `$1\n            {errors.work_types && <p className="text-sm text-destructive">{errors.work_types.message}</p>}`);
       return;
    }
    
    const textareaRegex = new RegExp(`(id="${field}"[\\s\\S]*?\\.\\.\\.register\\("${field}"\\)\\}\\s*\\/>)`);
    const tMatch = content.match(textareaRegex);
    if (tMatch) {
        content = content.replace(textareaRegex, `$1\n            {errors.${field} && <p className="text-sm text-destructive">{errors.${field}.message}</p>}`);
        return;
    }

    const tRegex2 = new RegExp(`(placeholder=[\\s\\S]*?\\.\\.\\.register\\("${field}"\\)\\}\\s*\\/>)`);
    const tm2 = content.match(tRegex2);
    if (tm2) {
        content = content.replace(tRegex2, `$1\n              {errors.${field} && <p className="text-sm text-destructive">{errors.${field}.message}</p>}`);
        return;
    }
  }
});

fs.writeFileSync(path, content);
console.log('Fixed errors in daily report form');
