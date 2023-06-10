import { Component, OnInit } from '@angular/core';
import { ProjectService } from './dish.service';
import { Project } from './dishes.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  records: Project[] = [];
  newRecord: Project = {
    name: '',
    description: '',
    contributors: '',
    created_at: new Date(),
    forks: 0,
    languages: '',
    owner: '',
    stars: 0,
    tags: '',
  };
  selectedRecord: Project | null = null;
  showForm = false;

  constructor(private projectService: ProjectService) {
    this.getRecords();
  }

  ngOnInit(): void {
    this.getRecords();
  }

  showUpdateForm(record: Project): void {
    this.selectedRecord = record;
    this.showForm = true;
  }

  hideForm(): void {
    this.selectedRecord = null;
    this.showForm = false;
  }

  getRecords(): void {
    this.projectService.getRecords().subscribe((record) => (this.records = record));
  }

  addRecord(): void {
    this.projectService.addRecord(this.newRecord).subscribe(() => {
      this.getRecords();
      this.newRecord = {
        name: '',
        description: '',
        contributors: '',
        created_at: new Date(),
        forks: 0,
        languages: '',
        owner: '',
        stars: 0,
        tags: '',
      };
    });
  }

  updateRecord(record: Project) {
    if (record._id) {
      this.projectService.updateRecord(record._id, record).subscribe(
        (updatedRecord) => {
          const index = this.records.findIndex((p) => p._id === updatedRecord._id);
          if (index !== -1) {
            this.records[index] = updatedRecord;
            this.selectedRecord = null;
            this.showForm = false;
          }
        },
        (error) => {
          console.error('Error updating record:', error);
        }
      );
    }
  }

  deleteRecord(recordId: string | undefined): void {
    if (!recordId) return;
    this.projectService.deleteRecord(recordId).subscribe(() => this.getRecords());
  }
}
