// Real-time Preview Updates
function updatePreview() {
    // Personal Details
    document.getElementById('preview-name').textContent = document.getElementById('name').value || '';
    document.getElementById('preview-position').textContent = document.getElementById('position').value || '';
    document.getElementById('preview-phone').textContent = document.getElementById('phone').value || '';
    document.getElementById('preview-email').textContent = document.getElementById('email').value || '';
    document.getElementById('preview-linkedin').textContent = document.getElementById('linkedin').value.split('/').pop() || '';
    document.getElementById('preview-linkedin').href = document.getElementById('linkedin').value || '';
    document.getElementById('preview-github').textContent = document.getElementById('github').value.split('/').pop() || '';
    document.getElementById('preview-github').href = document.getElementById('github').value || '';
    document.getElementById('preview-summary').textContent = document.getElementById('summary').value || '';

    // Skills
    document.getElementById('preview-technical-skills').textContent = document.getElementById('technical-skills').value || '';
    document.getElementById('preview-programming-languages').textContent = document.getElementById('programming-languages').value || '';
    document.getElementById('preview-tools').textContent = document.getElementById('tools').value || '';
    document.getElementById('preview-version-control').textContent = document.getElementById('version-control').value || '';
    document.getElementById('preview-ides').textContent = document.getElementById('ides').value || '';

    // Languages
    document.getElementById('preview-languages').innerHTML = document.getElementById('languages').value ? `<li>${document.getElementById('languages').value}</li>` : '';

    // Certifications
    const certificationsInput = document.getElementById('certifications').value || '';
    const certificationsArray = certificationsInput.split('\n').filter(cert => cert.trim() !== '');
    const previewCertifications = document.getElementById('preview-certifications');
    previewCertifications.innerHTML = certificationsArray.length ? certificationsArray.map(cert => `<li>${cert.trim()}</li>`).join('') : '';

    // Education, Experience, Projects updated dynamically in their respective functions
    updateEducationPreview();
    updateExperiencePreview();
    updateProjectPreview();
    saveResume();
}

// Add Education
function addEducation() {
    const container = document.getElementById('education-container');
    const entry = document.createElement('div');
    entry.className = 'education-entry';
    entry.innerHTML = `
        <input type="checkbox" class="input-checkbox">
        <input type="text" class="form-control" placeholder="Degree" value="">
        <input type="text" class="form-control" placeholder="Institute" value="">
        <input type="text" class="form-control" placeholder="Year" value="">
    `;
    container.appendChild(entry);
    updateEducationPreview();
}

// Remove Education
function removeEducation() {
    const entries = document.querySelectorAll('#education-container .education-entry');
    let removed = false;
    entries.forEach(entry => {
        const checkbox = entry.querySelector('.input-checkbox');
        if (checkbox.checked) {
            entry.remove();
            removed = true;
        }
    });
    if (entries.length === 0) {
        alert('No education entries to remove!');
    } else if (!removed) {
        alert('Please select entries to remove!');
    }
    updateEducationPreview();
}

// Update Education Preview
function updateEducationPreview() {
    const entries = document.querySelectorAll('#education-container .education-entry');
    const preview = document.getElementById('preview-education');
    preview.innerHTML = '';
    entries.forEach(entry => {
        const degree = entry.children[1].value || '';
        const institute = entry.children[2].value || '';
        const year = entry.children[3].value || '';
        if (degree || institute || year) {
            preview.innerHTML += `<li>${degree} - ${institute} - ${year}</li>`;
        }
    });
    saveResume();
}

// Add Experience
function addExperience() {
    const container = document.getElementById('experience-container');
    const entry = document.createElement('div');
    entry.className = 'experience-entry';
    entry.innerHTML = `
        <input type="checkbox" class="input-checkbox">
        <input type="text" class="form-control" placeholder="Role" value="">
        <input type="text" class="form-control" placeholder="Company" value="">
        <input type="text" class="form-control" placeholder="Duration" value="">
    `;
    container.appendChild(entry);
    updateExperiencePreview();
}

// Remove Experience
function removeExperience() {
    const entries = document.querySelectorAll('#experience-container .experience-entry');
    let removed = false;
    entries.forEach(entry => {
        const checkbox = entry.querySelector('.input-checkbox');
        if (checkbox.checked) {
            entry.remove();
            removed = true;
        }
    });
    if (entries.length === 0) {
        alert('No experience entries to remove!');
    } else if (!removed) {
        alert('Please select entries to remove!');
    }
    updateExperiencePreview();
}

// Update Experience Preview
function updateExperiencePreview() {
    const entries = document.querySelectorAll('#experience-container .experience-entry');
    const preview = document.getElementById('preview-experience');
    preview.innerHTML = '';
    entries.forEach(entry => {
        const role = entry.children[1].value || '';
        const company = entry.children[2].value || '';
        const duration = entry.children[3].value || '';
        if (role || company || duration) {
            preview.innerHTML += `<li>${role} - ${company} - ${duration}</li>`;
        }
    });
    saveResume();
}

// Add Project
function addProject() {
    const container = document.getElementById('projects-container');
    const entry = document.createElement('div');
    entry.className = 'project-entry';
    entry.innerHTML = `
        <input type="checkbox" class="input-checkbox">
        <input type="text" class="form-control" placeholder="Project Name" value="">
        <textarea class="form-control" placeholder="Description" rows="2"></textarea>
    `;
    container.appendChild(entry);
    updateProjectPreview();
}

// Remove Project
function removeProject() {
    const entries = document.querySelectorAll('#projects-container .project-entry');
    let removed = false;
    entries.forEach(entry => {
        const checkbox = entry.querySelector('.input-checkbox');
        if (checkbox.checked) {
            entry.remove();
            removed = true;
        }
    });
    if (entries.length === 0) {
        alert('No project entries to remove!');
    } else if (!removed) {
        alert('Please select entries to remove!');
    }
    updateProjectPreview();
}

// Update Project Preview
function updateProjectPreview() {
    const entries = document.querySelectorAll('#projects-container .project-entry');
    const preview = document.getElementById('preview-projects');
    preview.innerHTML = '';
    entries.forEach(entry => {
        const name = entry.children[1].value || '';
        const description = entry.children[2].value || '';
        if (name || description) {
            preview.innerHTML += `<li>${name} - ${description}</li>`;
        }
    });
    saveResume();
}

// Generate PDF
function generatePDF() {
    const element = document.getElementById('resume-preview');
    const spinner = document.getElementById('spinner');

    // Show spinner
    spinner.style.display = 'inline-block';

    // Hide buttons and checkboxes temporarily
    const buttons = document.querySelectorAll('.btn, .navbtn');
    const checkboxes = document.querySelectorAll('.input-checkbox');
    buttons.forEach(btn => btn.classList.add('none'));
    checkboxes.forEach(cb => cb.classList.add('none'));

    // Inject custom style to enforce border and alignment
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #resume-preview {
            border: 2px solid #7f8c8d !important;
            border-radius: 0 !important;
            width: 7.5in !important;
            padding: 0.3in !important;
            box-sizing: border-box !important;
            font-family: 'Calibri', sans-serif !important;
            font-size: 12px !important;
            line-height: 1.4 !important;
        }
        #resume-preview h5 {
            margin: 10px 0 5px !important;
        }
        #resume-preview ul {
            margin-bottom: 5px !important;
        }
        #resume-preview ul li {
            margin-bottom: 4px !important;
        }
    `;
    document.head.appendChild(styleElement);

    html2pdf()
        .from(element)
        .set({
            margin: 0.3,
            filename: 'resume.pdf',
            html2canvas: { scale: 1.5, logging: true, dpi: 192, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .toPdf()
        .get('pdf')
        .then((pdf) => {
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(12);
                pdf.setLineHeightFactor(1.4);
            }
            return pdf.save();
        })
        .then(() => {
            document.head.removeChild(styleElement);
            buttons.forEach(btn => btn.classList.remove('none'));
            checkboxes.forEach(cb => cb.classList.remove('none'));
            spinner.style.display = 'none';
        })
        .catch(err => {
            console.error('PDF generation failed:', err);
            alert('Failed to generate PDF. Please try again.');
            document.head.removeChild(styleElement);
            spinner.style.display = 'none';
            buttons.forEach(btn => btn.classList.remove('none'));
            checkboxes.forEach(cb => cb.classList.remove('none'));
        });
}

// Save Resume Content
function saveResume() {
    const content = document.getElementById('resume-preview').innerHTML;
    document.getElementById('custinfo').value = content;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial preview update with empty state
    updatePreview();

    // Real-time input updates
    document.querySelectorAll('#resumeForm input, #resumeForm textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Button clicks
    document.getElementById('add-education').addEventListener('click', addEducation);
    document.getElementById('remove-education').addEventListener('click', removeEducation);
    document.getElementById('add-experience').addEventListener('click', addExperience);
    document.getElementById('remove-experience').addEventListener('click', removeExperience);
    document.getElementById('add-project').addEventListener('click', addProject);
    document.getElementById('remove-project').addEventListener('click', removeProject);
    document.getElementById('generate-btn').addEventListener('click', updatePreview);
    document.getElementById('download-btn').addEventListener('click', generatePDF);
    document.getElementById('save-btn').addEventListener('click', saveResume);

    // Dynamic input updates for new entries
    document.getElementById('education-container').addEventListener('input', updateEducationPreview);
    document.getElementById('experience-container').addEventListener('input', updateExperiencePreview);
    document.getElementById('projects-container').addEventListener('input', updateProjectPreview);
});

// Utility class for hiding elements (used in PDF generation)
const style = document.createElement('style');
style.textContent = '.none { display: none !important; }';
document.head.appendChild(style);