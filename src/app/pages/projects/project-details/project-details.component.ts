import { Component, OnInit } from '@angular/core';
import { HeaderService, AuthService } from '@/services';
import { HttpClient } from '@angular/common/http';
import { Project } from '@/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  deleteQuestion: boolean;
  uri: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private headerService: HeaderService,
    private http: HttpClient,
    private router: Router
  ) {
    this.uri = '';
    this.deleteQuestion = false;
    this.project = undefined;
    route.params.subscribe(params => {
      this.refreshCurrentProject(params['id']);
    });
  }

  ngOnInit(): void {
    this.headerService.title = 'Project settings';
  }

  refreshCurrentProject(id) {
    this.uri = `/project?id=${id}`;
    console.log('fetching project ', id);
    this.http
      .get<Project>(this.uri)
      .toPromise()
      .then(project => (this.project = project));
  }

  updateProject(): void {}

  deleteProject() {
    this.http
      .delete(this.uri)
      .toPromise()
      .then(project => {
        this.router.navigate(['/']);
      })
      .catch(e => {
        console.error(e);
        this.deleteQuestion = false;
      });
  }
}
