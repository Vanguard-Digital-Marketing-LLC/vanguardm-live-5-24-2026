import { describe, it, expect } from 'vitest';
import { ContextWall } from '../lib/agentic/contextWall';
import { CoordinatingAgent } from '../lib/agentic/coordinatingAgent';
import { LeadAgent } from '../lib/agentic/leadAgent';

describe('Agentic Pipeline Unit Tests', () => {
  it('Context Wall should cluster data correctly', () => {
    const wall = new ContextWall();
    wall.addChunk('AgentA', 'Raw data 1', 'yellow');
    wall.addChunk('AgentB', 'Raw data 2', 'red');
    wall.addChunk('AgentC', 'Verified data', 'green');

    expect(wall.getAllChunks().length).toBe(3);
    expect(wall.getGreenClusters().length).toBe(1);
    expect(wall.getUnverifiedClusters().length).toBe(2);
  });

  it('Coordinating Agent should balance pressure and distill', async () => {
    const wall = new ContextWall();
    // Use a small maxTokenPressure to force distillation
    const ca = new CoordinatingAgent(wall, 50);

    wall.addChunk('Research', 'This is a very long string that will trigger distillation process because it exceeds 50 chars', 'yellow');
    
    await ca.balancePressure();

    // The unverified chunk should be removed, and a new 'green' distilled summary added
    expect(wall.getUnverifiedClusters().length).toBe(0);
    const green = wall.getGreenClusters();
    expect(green.length).toBe(1);
    expect(green[0].sourceAgent).toBe('CoordinatingAgent');
    expect(green[0].content).toContain('DISTILLED SUMMARY:');
  });

  it('Lead Agent should generate output based only on green clusters', async () => {
    const wall = new ContextWall();
    wall.addChunk('CoordinatingAgent', 'Verified distilled insights', 'green');

    const lead = new LeadAgent(wall);
    const output = await lead.generateFinalOutput('What is the status?');

    expect(output).toContain('Verified distilled insights');
    expect(output).toContain('What is the status?');
  });
});
