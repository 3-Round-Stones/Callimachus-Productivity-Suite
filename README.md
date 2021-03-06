# Callimachus Productivity Suite

Copyright (c) 2013 3 Round Stones Inc.

This is a collection of Callimachus applications with a common framework.

## Applications

### Annotations

The Annotations application implements the OpenAnnotations model of annotations.  It allows annotations of any page in a local Callimachus and also annotations of any external Web pages with the exception of the highlighting motivation.

Annotations may move into Callimachus core functionality.

### Directory

The Directory application provides a basic user directory for those with Callimachus accounts.  Arbitrary information about users may be defined, collected, viewed and maintained.

The Directory serves as a hub for the remainder of the applications by associating (e.g.) tasks or events with people.

### Events

The Events application provides a simple way to create and track upcoming events, such as conferences. This can be adapted to pertain to meetings or any other time-related occurrence.

### Nanopublications

The Nanopublications application implements the concept of nanopublications in Callimachus.  Nanopublications are tiny facts published as RDF statements.  Nanopublications have provenance associated with them and may be annotated and voted upon.

### Sales Pipeline

The Sales Pipeline application implements a basic sales pipeline for a small business.  It allows one to create entries and track their status over time.  This application may move to the Callimachus sample applications distribution.

We are evaluating whether each Callimachus sample application should have its own GitHub repo.

### Task Manager

The Task Manager application provides a way for individuals to track tasks assigned to them and for others to view those tasks.

## Data Storage

The resources that are created by these applications should be stored in a separate directory so that the applications can be updated without effecting the underlying data. We recommend a file path of /data.

