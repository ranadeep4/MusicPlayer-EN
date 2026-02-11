// Custom Playwright Reporter for AI Test Failure Analysis
import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { analyzeTestFailure } from './aiFailureAnalyzer.js';
import fs from 'fs';
import path from 'path';

interface FailureRecord {
  testName: string;
  errorMessage: string;
  stack?: string | undefined; // <-- Add | undefined here
  aiAnalysis?: {
    category: string;
    rootCause: string;
    suggestedFix: string;
    confidence: number;
  };
}
export default class AIAnalyzerReporter implements Reporter {
  private failures: FailureRecord[] = [];

  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed') {
      const error = result.error || {};
      const record: FailureRecord = {
        testName: test.title,
        errorMessage: error.message || 'Unknown error',
        stack: error.stack || undefined
      };
      // AI analysis (async)
      record.aiAnalysis = await analyzeTestFailure(
        record.testName,
        record.errorMessage,
        record.stack
      );
      this.failures.push(record);
    }
  }

  async onEnd() {
    if (this.failures.length > 0) {
      const reportPath = path.resolve(process.cwd(), 'ai-analysis-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(this.failures, null, 2), 'utf-8');
      console.log(`\nAI Failure Analysis saved to: ${reportPath}`);
    }
  }
}
