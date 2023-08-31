import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { TodoService } from '../../services/todo.service';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoItemInterface } from '../../models/todo-item.model';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

let loader: HarnessLoader;

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let mockTodoservice: TodoService;
  const item: TodoItemInterface = {
    task: 'test',
    status: 'in progress',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCheckboxModule, ReactiveFormsModule],
      declarations: [TodoItemComponent],
      providers: [
        {
          provide: TodoService,
          useValue: jasmine.createSpyObj('TodoService', {
            removeItem: undefined,
            editItem: undefined,
          }),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.item = item;
    fixture.detectChanges();
    mockTodoservice = TestBed.inject(
      TodoService
    ) as jasmine.SpyObj<TodoService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove item', () => {
    const removeBtn = fixture.debugElement.query(By.css('#remove-btn'));
    removeBtn.triggerEventHandler('click');
    expect(mockTodoservice.removeItem).toHaveBeenCalled();
  });

  it('should emit event on item status change', async () => {
    const statusCheckbox = await loader.getHarness(MatCheckboxHarness);
    const statusChangeSpy = spyOn(component.checkboxChecked, 'emit');
    await statusCheckbox.toggle();
    expect(statusChangeSpy).toHaveBeenCalled();
  });

  it('should enter edit mode', async () => {
    const enterEditBtn = fixture.debugElement.query(By.css('#enter-edit-btn'));
    enterEditBtn.triggerEventHandler('click');
    expect(component.editMode).toBeTrue();
  });

  it('should cancel edit mode', async () => {
    component.editMode = true;
    fixture.detectChanges();
    const enterEditBtn = fixture.debugElement.query(By.css('#cancel-edit-btn'));
    enterEditBtn.triggerEventHandler('click');
    expect(component.editMode).toBeFalse();
  });

  it('should edit item', async () => {
    component.editMode = true;
    fixture.detectChanges();
    const editBtn = fixture.debugElement.query(By.css('#edit-btn'));
    editBtn.triggerEventHandler('click');
    expect(mockTodoservice.editItem).toHaveBeenCalled();
  });

  it('should not edit item if the value is not set', async () => {
    component.editMode = true;
    fixture.detectChanges();
    const editBtn = fixture.debugElement.query(By.css('#edit-btn'));
    component.editForm.controls.task.setValue('');
    editBtn.triggerEventHandler('click');
    expect(mockTodoservice.editItem).not.toHaveBeenCalled();
  });
});
