import { Document, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeFormData } from './types';

export async function downloadResume(data: ResumeFormData) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [new TextRun({ text: data.fullName, bold: true, size: 28 })],
        }),
        new Paragraph({
          children: [new TextRun({ text: data.contactDetails, size: 24 })],
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Career Objective', bold: true, size: 26 })],
        }),
        new Paragraph({
          children: [new TextRun({ text: data.careerObjective })],
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Professional Experience', bold: true, size: 26 })],
        }),
        new Paragraph({
          children: [new TextRun({ text: data.currentExperience })],
        }),
      ],
    }],
  });

  const blob = await doc.save('blob');
  saveAs(blob, `${data.jobTitle.replace(/\s+/g, '-')}-resume.docx`);
}