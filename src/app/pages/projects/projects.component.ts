import { Component, OnInit } from '@angular/core';
import { HeaderService, AuthService } from '@/services';
import { HttpClient } from '@angular/common/http';
import { Project } from '@/interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  loading: boolean;

  constructor(
    public headerService: HeaderService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loading = false;
    this.projects = [];
  }

  ngOnInit(): void {
    this.headerService.title = 'Projects';
    this.refreshProjectList();
  }

  refreshProjectList(): void {
    this.authService.refreshAuthState().then(state => {
      const uri = `/project?user=${state.user.attributes.sub}`;
      this.http
        .get<Project[]>(uri)
        .toPromise()
        .then(projects => {
          console.log('got projects', projects);
          this.projects = projects;
        })
        .catch(e => {
          console.log('E', e);
        });
    });
  }

  createProject() {
    this.loading = true;
    this.authService
      .refreshAuthState()
      .then(state => {
        const uri = `/project?user=${state.user.attributes.sub}`;
        this.http
          .put<Project>(uri, {
            name: { S: `Project ${this.projects.length + 1}` },
          })
          .toPromise()
          .then(project => {
            this.projects.push(project);
          })
          .finally(() => (this.loading = false));
      })
      .catch(e => {
        console.error(e);
      });
  }

  formatRoute(input): string {
    let idChunks = input.split('#');
    return idChunks[1];
  }
}
